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

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatGptService {
    @Value("${openai.api-key}")
    private String apiKey;
    private static final String OPEN_AI_CHAT_ENDPOINT = "https://api.openai.com/v1/chat/completions";

    private final RestTemplate restTemplate;

    public ChatGptResponse getChatGptResponse(String prompt) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        ChatGptRequest chatGPTRequest = new ChatGptRequest();
        chatGPTRequest.setModel("gpt-3.5-turbo"); // Most capable GPT-3.5 model and optimized for chat.
        chatGPTRequest.setMessages(List.of(new Message("user", prompt))); // Input prompt for ChatGPT
        chatGPTRequest.setMax_tokens(300); // The maximum number of tokens to generate in the chat completion.

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<ChatGptRequest> request = new HttpEntity<>(chatGPTRequest, headers);

        return restTemplate.postForObject(OPEN_AI_CHAT_ENDPOINT, request, ChatGptResponse.class);
    }

}