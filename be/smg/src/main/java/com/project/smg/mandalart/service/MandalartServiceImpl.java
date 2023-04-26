package com.project.smg.mandalart.service;

import com.project.smg.mandalart.dto.ChatGptRequest;
import com.project.smg.mandalart.dto.ChatGptResponse;
import com.project.smg.mandalart.dto.Message;
import com.project.smg.mandalart.entity.GptBigGoal;
import com.project.smg.mandalart.entity.GptTitle;
import com.project.smg.mandalart.repository.GptTitleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MandalartServiceImpl implements MandalartService {
    @Value("${openai.api-key}")
    private String apiKey;
    private static final String OPEN_AI_CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions";

    private final RestTemplate restTemplate;
    private final GptTitleRepository gptTitleRepository;

    public ChatGptResponse getChatGptResponse(String prompt) {



        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        String mandal = prompt + "이/가 되기 위해 필요한 8가지 목표를 간략히 나열해주세요";

        ChatGptRequest chatGPTRequest = new ChatGptRequest();
        chatGPTRequest.setModel("gpt-3.5-turbo"); // Most capable GPT-3.5 model and optimized for chat.
        chatGPTRequest.setMessages(List.of(new Message("assistant", mandal))); // Input prompt for ChatGPT
        chatGPTRequest.setMax_tokens(300); // The maximum number of tokens to generate in the chat completion.

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<ChatGptRequest> request = new HttpEntity<>(chatGPTRequest, headers);

        return restTemplate.postForObject(OPEN_AI_CHAT_ENDPOINT, request, ChatGptResponse.class);
    }

    @Override
    public HashMap<String, List<String>> getBigGoals(String content) {
        HashMap<String, List<String>> result = new HashMap<>();
        // DB에 저장되있는지 확인
        Optional<GptTitle> byTitle = gptTitleRepository.findByContent(content);
        // 있다면 DB에서 리턴
        if(byTitle.isPresent()){
            result.put(content, getSavedGptBigGoal(byTitle));
            return result;
        }

        ChatGptResponse chatGptResponse = getChatGptResponse(content);

        // 받아온 메세지 리스트로 형 변환
        String[] split = chatGptResponse.choices.get(0).message.content.split("\n");
        List<String> strings = Arrays.stream(split).map(i -> i.substring(3)).collect(Collectors.toList());

        // 담아서 return

        result.put(content, strings);
        return result;
    }

    // GptTitle에 저장되 있는 BigGoal 가져오기
    public List<String> getSavedGptBigGoal(Optional<GptTitle> optional){
        List<String> savedGptBigGoal = optional.get().getGptBigGoals()
                .stream()
                .map(i -> i.getContent())
                .collect(Collectors.toList());
        return savedGptBigGoal;
    }

    public void saveGptBigGoal(String title, List<String> strings){
//        GptBigGoal.builder().content()
//        GptTitle.builder()
//                        .content(title).gptBigGoals().build();
//        gptTitleRepository.save();
    }
}