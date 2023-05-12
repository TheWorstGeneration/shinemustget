package com.project.smg.mandalart.service;

import com.project.smg.mandalart.dto.BigDto;
import com.project.smg.mandalart.dto.MandalartRequestDto;
import com.project.smg.mandalart.dto.SearchDetailResponseDto;
import com.project.smg.member.dto.SearchDto;
import org.springframework.scheduling.annotation.Async;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

public interface MandalartService {
    @Async
    public CompletableFuture<ConcurrentHashMap<String, Object>> getBigGoals(String content);
    @Async
    public CompletableFuture<ConcurrentHashMap<String, Object>> getSmallGoals(List<String> bigGoal);

    public void createMandalart(MandalartRequestDto mandalartRequestDto, String mid);
    public HashMap<String, Object> getMainMandalart(String mid);

    public List<SearchDto> getSearchMandalart(String mid, String word, String pageNo);

    public SearchDetailResponseDto getSearchDetail(String mid, int id);
    public void clearGoal(String mid, int id);
}
