package com.project.smg.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    int id;
    String title;
    List<SearchBigDto> bigList;
    @JsonProperty("isLike")
    boolean isLike;
    int likeCnt;
}
