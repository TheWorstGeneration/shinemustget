package com.project.smg.podo.service;

import com.project.smg.member.entity.Member;
import com.project.smg.podo.dto.PodoCreateDto;
import com.project.smg.podo.dto.PodoDetailDto;
import com.project.smg.podo.dto.StickerDto;

import java.util.List;
import java.util.Map;

public interface PodoService {
    void create(String mid, PodoCreateDto podoCreateDto) throws Exception;

    List<StickerDto> sticker(String mid);

    Map<String, Object> read(String mid, int id);

    void podoSetting(String mid, int id);

    PodoDetailDto detailPodo(String mid, int id);

    boolean podoSettingRead(String mid, int id);

    boolean isSpecialClear(String mid, int id);

    void checkSpecialStickerTime(Member member);
}
