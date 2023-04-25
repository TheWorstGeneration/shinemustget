package com.project.smg.podo.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PodoDetailDto {
    private int id;
    private String oneline;
    private LocalDateTime createdAt;
}
