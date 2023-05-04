package com.project.smg.mandalart.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatGptResponseDto {
    public String id;
    public String object;
    public int created;
    public List<ChoiceDto> choices;
    public UsageDto usage;
}
