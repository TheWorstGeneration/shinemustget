package com.project.smg.podo.service;

import com.project.smg.podo.dto.PodoCreateDto;

public interface PodoService {
    void create(String token, PodoCreateDto podoCreateDto);
}
