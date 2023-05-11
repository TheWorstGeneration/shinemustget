package com.project.smg.mandalart.service;

import com.project.smg.mandalart.dto.*;
import com.project.smg.mandalart.entity.*;
import com.project.smg.mandalart.repository.*;
import com.project.smg.member.dto.SearchBigDto;
import com.project.smg.member.dto.SearchDto;
import com.project.smg.member.entity.Member;
import com.project.smg.member.entity.Role;
import com.project.smg.member.repository.MemberRepository;
import com.project.smg.podo.entity.Podo;
import com.project.smg.podo.repository.PodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class MandalartServiceImpl implements MandalartService {
    @Value("${openai.api-key}")
    private String apiKey;
    private final GptTitleRepository gptTitleRepository;
    private final GptBigGoalRepository gptBigGoalRepository;
    private final MemberRepository memberRepository;
    private final TitleRepository titleRepository;
    private final PodoRepository podoRepository;
    private final MandalartLikeService mandalartLikeService;
    private final SmallGoalRepository smallGoalRepository;
    private final SearchRepository searchRepository;
    private final BigGoalRepository bigGoalRepository;
    private static final String OPEN_AI_CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions";

    /** Gpt 요청 */
    @Async
    public CompletableFuture<ChatGptResponseDto> getChatGptResponse(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        String mandal = prompt + "이/가 되기 위해 필요한 8가지 목표 설명을 생략하고 간략하게 짧은 키워드로만 알려줘 응답 형식은 '1. 운동하기\\n2.배달음식 줄이기\\n3.' 이런 형식으로 적어줘";

        ChatGptRequestDto chatGPTRequest = new ChatGptRequestDto();
        chatGPTRequest.setModel("gpt-3.5-turbo"); // Most capable GPT-3.5 model and optimized for chat.
        chatGPTRequest.setMessages(List.of(new MessageDto("assistant", mandal))); // Input prompt for ChatGPT
        chatGPTRequest.setMax_tokens(300); // The maximum number of tokens to generate in the chat completion.

        WebClient client = WebClient.builder()
                .baseUrl(OPEN_AI_CHAT_ENDPOINT)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .build();

        return client.post()
                .body(Mono.just(chatGPTRequest), ChatGptRequestDto.class)
                .retrieve()
                .bodyToMono(ChatGptResponseDto.class)
                .toFuture();
    }


    /** 만다라트 타이틀 생성 */
    @Transactional
    @Override
    @Async
    public CompletableFuture<ConcurrentHashMap<String, Object>> getBigGoals(String content) {
        ConcurrentHashMap<String, Object> result = new ConcurrentHashMap<>();

        // DB에 저장되있는지 확인
        Optional<GptTitle> byTitle = gptTitleRepository.findByContent(content);
        // 있다면 DB에서 리턴
        if (byTitle.isPresent()) {
            result.put(content, getSavedGptBigGoal(byTitle));
            return CompletableFuture.completedFuture(result);
        }

        CompletableFuture<ChatGptResponseDto> asyncChatGptResponse = getChatGptResponse(content);

        return asyncChatGptResponse.thenApply(response -> {
            // 받아온 메세지 리스트로 변환
            String[] split = response.choices.get(0).message.content.split("\n");
            List<String> bigGoals = Arrays.stream(split).map(i -> i.substring(2)).collect(Collectors.toList());
            List<String> trimBigGoals = bigGoals.stream().map(i -> i.trim()).collect(Collectors.toList());
            // GptTitle, GptBigGoal에 저장
            saveGptBigGoal(content, trimBigGoals);

            // 담아서 return
            result.put(content, trimBigGoals);
            return result;
        });
    }

    /** 만다라트 세부 목표 생성 */
    @Transactional
    @Override
    @Async
    public CompletableFuture<ConcurrentHashMap<String, Object>> getSmallGoals(List<String> bigGoal) {
        List<CompletableFuture<ConcurrentHashMap<String, Object>>> futures = new ArrayList<>();
        for(String content : bigGoal){
            CompletableFuture<ConcurrentHashMap<String, Object>> asyncBigGoals = getBigGoals(content);
            futures.add(asyncBigGoals);
        }
        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenApply(v -> {
                    ConcurrentHashMap<String, Object> result = new ConcurrentHashMap<>();
                    for (int i = 0; i < bigGoal.size(); i++) {
                        for(String key : futures.get(i).join().keySet()) result.put(key, futures.get(i).join().get(key));
                    }
                    return result;
                });
    }

    /** 만다라트 생성 */
    @Transactional
    @Override
    public void createMandalart(MandalartRequestDto mandalartRequestDto, String mid) {
        Optional<Member> member = memberRepository.findById(mid);
        Title title = Title.builder()
                .createdAt(LocalDateTime.now())
                .content(mandalartRequestDto.getTitle())
                .likeCnt(0)
                .bigGoals(new ArrayList<>())
                .build();
        title.addMember(member.get());
        for(BigRequestDto bigRequestDto : mandalartRequestDto.getBigRequestDto()){
            BigGoal bigGoal = BigGoal.builder()
                    .location(bigRequestDto.getLocation())
                    .content(bigRequestDto.getContent())
                    .smallGoals(new ArrayList<>())
                    .build();
            bigGoal.addTitle(title);
            for(SmallRequestDto smallRequestDto : bigRequestDto.getSmallRequestDto()){
                SmallGoal smallGoal = SmallGoal.builder()
                        .location(smallRequestDto.getLocation())
                        .content(smallRequestDto.getContent())
                        .isSticker(false)
                        .build();
                smallGoal.addBigGoal(bigGoal);
            }
        }

        Member newMember = member
                .orElse(null);
        newMember.authorizeUser();
        memberRepository.save(newMember);

        titleRepository.save(title);
    }

    /** 만다라트 조회 */
    @Override
    @Transactional
    public HashMap<String, Object> getMainMandalart(String mid) {
        Optional<Member> optional = memberRepository.findById(mid);
        Member member = optional.orElseThrow(() -> new IllegalStateException("회원이 존재하지 않습니다."));

        Optional<Title> top1ByMemberOrderByIdDesc = titleRepository.findTop1ByMemberAndDeletedAtIsNullOrderByIdDesc(member);
        Title title = top1ByMemberOrderByIdDesc.orElse(null);

        HashMap<String, Object> result;

        if(title == null)
            result = new HashMap<>();
        else {
            result = new HashMap<>();
            result.put("title", title.getContent());
            result.put("isClear", title.getClearAt() == null ? false : true);
            result.put("bigList", makeBigDto(title.getBigGoals()));
        }

        return result;
    }

    /** 만다라트 검색 */
    @Override
    public List<SearchDto> getSearchMandalart(String mid, String word, String pageNo) {
        PageRequest page = PageRequest.of(Integer.parseInt(pageNo), 10, Sort.by("likeCnt").descending());
        Page<SearchDocument> pageEls = searchRepository.findAllByTitleOrderByLikeCntDesc(word, page);
        List<SearchDto> searchList = new ArrayList<>();
        if(pageEls.isEmpty()) return searchList;

        List<SearchDocument> content = pageEls.getContent();

        searchList = content.stream()
                .map(title -> SearchDto.builder()
                        .id(title.getId())
                        .title(title.getTitle())
                        .isLike(mandalartLikeService.isMandalartLike(mid, title.getId()))
                        .likeCnt(mandalartLikeService.mandalartLikeCnt(title.getId()))
                        .bigList(
                                title.getBigList().stream().map(bigGoal ->
                                        SearchBigDto.builder()
                                                .content(bigGoal.getContent())
                                                .location(bigGoal.getLocation())
                                                .build()).collect(Collectors.toList())
                        )
                        .build()
                )
                .collect(Collectors.toList());
        return searchList;
    }


    /** 만다라트 상세 조회 */
    @Override
    public SearchDetailResponseDto getSearchDetail(String mid, int id) {
        SearchDetailResponseDto SearchDetailResponse = null;

        Optional<Title> byId = titleRepository.findById(id);
        if(!byId.isPresent()) return SearchDetailResponse;
        Title title = byId.get();

        SearchDetailResponse = SearchDetailResponseDto.builder()
                .likeDto(
                        LikeDto.builder()
                                .isLike(mandalartLikeService.isMandalartLike(mid, id))
                                .likeCnt(id)
                                .build()
                )
                .mandalartRequestDto(
                        MandalartRequestDto.builder()
                                .title(title.getContent())
                                .bigRequestDto(title.getBigGoals().stream()
                                                .map(bigGoal -> BigRequestDto.builder()
                                                                .content(bigGoal.getContent())
                                                                .location(bigGoal.getLocation())
                                                                .smallRequestDto(bigGoal.getSmallGoals().stream()
                                                                                .map(smallGoal -> SmallRequestDto.builder()
                                                                                                .location(smallGoal.getLocation())
                                                                                                .content(smallGoal.getContent())
                                                                                                .build()
                                                                                ).collect(Collectors.toList())
                                                                ).build()
                                                ).collect(Collectors.toList())
                                ).build()
                ).build();
        return SearchDetailResponse;
    }

    /** 세부목표 완료 */
    @Transactional
    @Override
    public void clearGoal(String mid, int id) {
        Optional<Title> title = titleRepository.findTopByMemberIdAndClearAtIsNullOrderByCreatedAtDesc(mid);
        Optional<SmallGoal> byId = smallGoalRepository.findById(id);
        System.out.println("test");
        if(byId.isPresent()){
            SmallGoal smallGoal = byId.get();
            smallGoal.setClearAt(LocalDateTime.now());
            if(isFinishBigGoal(smallGoal) && title.isPresent()){
                checkFinishTitle(title.get());
            }
            smallGoalRepository.save(smallGoal);
        }
    }

    /** 빅골 완료시 타이틀 완료되는지 체크 */
    @Transactional
    public void checkFinishTitle(Title title){
        boolean check = true;
        for(BigGoal bigGoal : title.getBigGoals()){
            // 아직 완료하지 못한것 중에
            if(bigGoal.getClearAt() == null){
                for(SmallGoal smallGoal : bigGoal.getSmallGoals()){
                    // 스티커인데 완료 못했으면 빅골 완료 x
                    if(smallGoal.isSticker() && smallGoal.getClearAt() == null){
                        check = false;
                        return;
                    }
                }
            }
        }
        if(check) title.setClearAt(LocalDateTime.now());
    }

    /** 세부목표 완료시 빅골 완료되는지 체크 */
    @Transactional
    public boolean isFinishBigGoal(SmallGoal smallGoal){
        boolean check = true;
        Optional<BigGoal> byId = bigGoalRepository.findById(smallGoal.getBigGoal().getId());
        if(byId.isPresent()){
            BigGoal bigGoal = byId.get();
            for(SmallGoal goal : bigGoal.getSmallGoals()){
                if(goal.isSticker() && goal.getClearAt() == null) check = false;
            }
            if(check){
                bigGoal.setClearAt(LocalDateTime.now());
            }
        }
        return check;
    }

    /** 완료된 만다라트 ElasticSearch에 저장 */
    public void saveClearTitle(Title title) {
        SearchDocument search = SearchDocument.builder()
                .id(title.getId())
                .title(title.getContent())
                .bigList(
                        title.getBigGoals().stream()
                                .map(bigGoal -> new SearchBigDocument().builder()
                                        .id(bigGoal.getId())
                                        .content(bigGoal.getContent())
                                        .location(bigGoal.getLocation())
                                        .build()).collect(Collectors.toList())
                )
                .likeCnt(title.getLikeCnt())
                .build();
        searchRepository.save(search);
    }

    /** Gpt에 저장된 세부목표 불러오기 */
    @Async
    public List<String> getSavedGptBigGoal(Optional<GptTitle> optional){
        GptTitle gptTitle = optional.orElseThrow(() -> new IllegalStateException("저장된 Title이 없습니다."));
        Optional<GptBigGoal> byId = gptBigGoalRepository.findById(gptTitle.getId());
        List<String> savedGptBigGoal = optional.get().getGptBigGoals()
                .stream()
                .map(i -> i.getContent())
                .collect(Collectors.toList());
        return savedGptBigGoal;
    }

    /** Gpt로 만든 세부목표 저장하기 */
    @Transactional
    @Async
    public void saveGptBigGoal(String title, List<String> strings){
        List<GptBigGoal> gptBigGoals = strings.stream()
                .map(i -> GptBigGoal.builder().content(i).build())
                .collect(Collectors.toList());

        GptTitle gptTitle = GptTitle.builder()
                .content(title)
//                .gptBigGoals(gptBigGoals)
                .gptBigGoals(new ArrayList<>())
                .build();

        for(int i = 0; i < gptBigGoals.size(); i++) gptBigGoals.get(i).addGptTitle(gptTitle);
        gptTitleRepository.save(gptTitle);
    }

    /** BigDto 리스트 생성 */
    public List<BigDto> makeBigDto(List<BigGoal> bigGoals){
        List<BigDto> bigDtos = new ArrayList<>();
        for(BigGoal bigGoal : bigGoals){
            List<SmallDto> smallDtos = makeSmallDto(bigGoal.getSmallGoals());
            BigDto bigDto = BigDto.builder()
                    .location(bigGoal.getLocation())
                    .content(bigGoal.getContent())
                    .isClear(bigGoal.getClearAt() == null ? false : true)
                    .smallList(smallDtos)
                    .build();
            bigDtos.add(bigDto);
        }
        return bigDtos;
    }

    /** SmallDto 리스트 생성 */
    public List<SmallDto> makeSmallDto(List<SmallGoal> smallGoals){
        List<SmallDto> smallDtos = new ArrayList<>();
        for(SmallGoal smallGoal : smallGoals){
            SmallDto smallDto = SmallDto.builder()
                    .id(smallGoal.getId())
                    .location(smallGoal.getLocation())
                    .content(smallGoal.getContent())
                    .isPodo(smallGoal.isSticker())
                    .isToday(false)
                    .isClear(smallGoal.getClearAt() == null ? false : true)
                    .build();
            
            // 포도로 생성됬고, 가장 최근 생성된 포도가 있다면 오늘 만든 포도인지 찾기
            if(smallDto.isPodo()){
                Optional<Podo> top1BySmallGoalOrderByIdDesc = podoRepository.findTop1BySmallGoalOrderByIdDesc(smallGoal);
                if(top1BySmallGoalOrderByIdDesc.isPresent()){
                    if(top1BySmallGoalOrderByIdDesc.get().getCreatedAt().toLocalDate()
                            .equals(LocalDate.now())) smallDto.setToday(true);
                }
            }
            smallDtos.add(smallDto);
        }
        return smallDtos;
    }

}
