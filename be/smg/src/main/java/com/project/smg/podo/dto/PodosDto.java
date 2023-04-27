package com.project.smg.podo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PodosDto {
    private int podoCnt;
    private List<PodoDto> podoDtoList;

}
