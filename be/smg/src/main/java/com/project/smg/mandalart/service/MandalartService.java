package com.project.smg.mandalart.service;

import org.springframework.scheduling.annotation.Async;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

public interface MandalartService {
    @Async
    public CompletableFuture<ConcurrentHashMap<String, Object>> getBigGoals(String content);
    @Async
    public CompletableFuture<ConcurrentHashMap<String, Object>> getSmallGoals(List<String> bigGoal);


}
