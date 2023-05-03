package com.project.smg.mandalart.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatGptRequestDto {
    private String model;
    private List<MessageDto> messages;
    private Integer max_tokens;
}
