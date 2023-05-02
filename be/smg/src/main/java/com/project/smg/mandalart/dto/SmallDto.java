package com.project.smg.mandalart.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SmallDto {

    private int id;
    private int location;
    private String content;

    private boolean isPodo;
    private boolean isToday;
    private boolean isClear;
}
