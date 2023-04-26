package com.project.smg.podo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PodoDetailDto {
    private int id;
    private String oneline;
    private LocalDateTime createdAt;
}
