package com.project.smg.podo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PodoDetailDto {
    private int id;
    private String oneline;
    private LocalDateTime createdAt;
}
