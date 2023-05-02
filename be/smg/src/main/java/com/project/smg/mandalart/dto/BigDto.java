package com.project.smg.mandalart.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BigDto {
    private int location;
    private String content;
    private boolean isClear;
    private List<SmallDto> smallList;
}
