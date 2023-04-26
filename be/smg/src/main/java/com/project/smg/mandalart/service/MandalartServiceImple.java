package com.project.smg.mandalart.service;

import com.project.smg.mandalart.dto.ChatGptRequest;
import com.project.smg.mandalart.dto.ChatGptResponse;
import com.project.smg.mandalart.dto.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MandalartServiceImple implements MandalartService {
    @Value("${openai.api-key}")
    private String apiKey;
    private static final String OPEN_AI_CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions";

    private final RestTemplate restTemplate;

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
    public HashMap<String, List<String>> getBigGoals(String contents) {
        ChatGptResponse chatGptResponse = getChatGptResponse(contents);
        String[] content = chatGptResponse.choices.get(0).message.content.split("\n");
        List<String> strings = Arrays.stream(content).map(i -> i.substring(3)).collect(Collectors.toList());
        HashMap<String, List<String>> result = new HashMap<>();
        result.put(contents, strings);
        return result;
    }
}