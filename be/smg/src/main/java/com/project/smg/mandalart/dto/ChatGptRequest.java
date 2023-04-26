package com.project.smg.mandalart.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatGptRequest {
    private String model;
    private List<Message> messages;
    private Integer max_tokens;
}
