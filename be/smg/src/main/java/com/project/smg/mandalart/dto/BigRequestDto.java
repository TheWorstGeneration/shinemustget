package com.project.smg.mandalart.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BigRequestDto {
    private String content;
    private int location;
    private List<SmallRequestDto> smallRequestDto;
}
