package com.project.smg.mandalart.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchDetailResponseDto {
    private LikeDto likeDto;
    private MandalartRequestDto mandalartRequestDto;
}
