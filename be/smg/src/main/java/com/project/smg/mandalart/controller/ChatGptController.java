package com.project.smg.mandalart.controller;

import com.project.smg.mandalart.dto.ChatGptRequest;
import com.project.smg.mandalart.dto.ChatGptResponse;
import com.project.smg.mandalart.dto.InputRequest;
import com.project.smg.mandalart.service.ChatGptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatGptController {
    private final ChatGptService chatGptService;

    @PostMapping("/chat")
    public ResponseEntity<ChatGptResponse> chat(@RequestBody InputRequest inputRequest){
        ChatGptResponse chatGptResponse = chatGptService.getChatGptResponse(inputRequest.getMessage());
        return ResponseEntity.status(HttpStatus.OK).body(chatGptResponse);
    }
}
