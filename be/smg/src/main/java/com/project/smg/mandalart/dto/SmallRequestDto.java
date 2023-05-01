package com.project.smg.mandalart.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SmallRequestDto {
    private String content;
    private int location;
}
