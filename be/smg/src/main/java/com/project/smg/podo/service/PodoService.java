package com.project.smg.podo.service;

import com.project.smg.podo.dto.PodoCreateDto;
import com.project.smg.podo.dto.StickerDto;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Map;

public interface PodoService {
    void create(String token, PodoCreateDto podoCreateDto);

    List<StickerDto> sticker(String token);

    Map<String, Object> read(String token, PageRequest pageRequest, int id, int page);
}
