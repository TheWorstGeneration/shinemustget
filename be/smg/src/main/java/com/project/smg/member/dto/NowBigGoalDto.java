package com.project.smg.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NowBigGoalDto {
    String content;
    @JsonProperty("isClear")
    boolean isClear;
}
