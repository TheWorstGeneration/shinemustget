package com.project.smg.podo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PodoCreateDto {
    private int id;
    private String stickerType;
    private String oneline;

}
