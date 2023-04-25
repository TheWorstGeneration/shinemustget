package com.project.smg.podo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PodoCreateDto {
    private int id;
    private String stickerType;
    private String oneline;

}
