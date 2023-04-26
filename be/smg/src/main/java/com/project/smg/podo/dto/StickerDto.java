package com.project.smg.podo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class StickerDto {
    private int id;
    private Boolean isMine;
    private String imageUrl;

}
