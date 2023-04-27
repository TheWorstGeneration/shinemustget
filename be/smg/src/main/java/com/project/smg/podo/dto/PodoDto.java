package com.project.smg.podo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PodoDto {
    private int id;
    private String oneline;
    private String imageUrl;
}
