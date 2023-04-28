package com.project.smg.mandalart.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SmallGoalRequestDto {
    private List<String> bigGoal;
//    private String bigGoal;
}
