package com.project.smg.podo.service;

import com.project.smg.podo.dto.PodoCreateDto;
import com.project.smg.podo.dto.StickerDto;

import java.util.List;

public interface PodoService {
    void create(String token, PodoCreateDto podoCreateDto);

    List<StickerDto> sticker(String token);
}
