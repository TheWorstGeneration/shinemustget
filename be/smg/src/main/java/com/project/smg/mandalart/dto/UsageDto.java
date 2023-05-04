package com.project.smg.mandalart.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UsageDto {
    public int prompt_tokens;
    public int completion_tokens;
    public int total_tokens;
}
