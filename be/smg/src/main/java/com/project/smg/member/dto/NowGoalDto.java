package com.project.smg.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NowGoalDto {
    String title;
    int rate;
    List<NowBigGoalDto> nowBigGoalDtoList;
}
