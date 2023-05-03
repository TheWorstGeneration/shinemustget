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
public class SearchDto {
    String title;
    List<SearchBigDto> bigList;
    boolean isLike;
    int likeCnt;
}
