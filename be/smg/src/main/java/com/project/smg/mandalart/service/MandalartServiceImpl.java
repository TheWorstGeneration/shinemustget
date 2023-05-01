package com.project.smg.mandalart.service;

import com.project.smg.mandalart.dto.*;
import com.project.smg.mandalart.entity.GptBigGoal;
import com.project.smg.mandalart.entity.GptTitle;
import com.project.smg.mandalart.repository.GptBigGoalRepository;
import com.project.smg.mandalart.repository.GptTitleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MandalartServiceImpl implements MandalartService {
    @Value("${openai.api-key}")
    private String apiKey;
    private final GptTitleRepository gptTitleRepository;
    private final GptBigGoalRepository gptBigGoalRepository;
    private static final String OPEN_AI_CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions";

    @Async
    public CompletableFuture<ChatGptResponse> getChatGptResponse(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        String mandal = prompt + "이/가 되기 위해 필요한 8가지 목표를 설명 빼고 3어절 이하로 한줄씩 띄워서 적어줘";

        ChatGptRequest chatGPTRequest = new ChatGptRequest();
        chatGPTRequest.setModel("gpt-3.5-turbo"); // Most capable GPT-3.5 model and optimized for chat.
        chatGPTRequest.setMessages(List.of(new Message("assistant", mandal))); // Input prompt for ChatGPT
        chatGPTRequest.setMax_tokens(300); // The maximum number of tokens to generate in the chat completion.

        WebClient client = WebClient.builder()
                .baseUrl(OPEN_AI_CHAT_ENDPOINT)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .build();

        return client.post()
                .body(Mono.just(chatGPTRequest), ChatGptRequest.class)
                .retrieve()
                .bodyToMono(ChatGptResponse.class)
                .toFuture();
    }


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

        CompletableFuture<ChatGptResponse> asyncChatGptResponse = getChatGptResponse(content);

        return asyncChatGptResponse.thenApply(response -> {
            // 받아온 메세지 리스트로 변환
            String[] split = response.choices.get(0).message.content.split("\n");
            List<String> bigGoals = Arrays.stream(split).map(i -> i.substring(2)).collect(Collectors.toList());

            // GptTitle, GptBigGoal에 저장
            saveGptBigGoal(content, bigGoals);

            // 담아서 return
            result.put(content, bigGoals);
            return result;
        });
    }

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

    @Transactional
    @Async
    public List<String> getSavedGptBigGoal(Optional<GptTitle> optional){
        Optional<GptBigGoal> byId = gptBigGoalRepository.findById(optional.get().getId());
        List<String> savedGptBigGoal = optional.get().getGptBigGoals()
                .stream()
                .map(i -> i.getContent())
                .collect(Collectors.toList());
        return savedGptBigGoal;
    }

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

}
