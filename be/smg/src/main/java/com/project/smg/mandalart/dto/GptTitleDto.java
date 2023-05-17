package com.project.smg.mandalart.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GptTitleDto {
    private int id;
    private String content;
    private List<GptBigGoalDto> gptBigGoals;
}
