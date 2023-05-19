package com.project.smg.mandalart.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BigDto implements Serializable {
    private int location;
    private String content;
    @JsonProperty("isClear")
    private boolean isClear;
    private List<SmallDto> smallList;
}
