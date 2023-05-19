package com.project.smg.mandalart.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SmallDto implements Serializable {
    private int id;
    private int location;
    private String content;
    @JsonProperty("isPodo")
    private boolean isPodo;
    @JsonProperty("isToday")
    private boolean isToday;
    @JsonProperty("isClear")
    private boolean isClear;

}
