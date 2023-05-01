//package com.project.smg.mandalart.service;
//
//import com.project.smg.mandalart.dto.ChatGptResponse;
//import org.springframework.scheduling.annotation.Async;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.concurrent.CompletableFuture;
//import java.util.concurrent.ConcurrentHashMap;
//
//public interface AsyncMandalartService {
//    @Async
//    public CompletableFuture<ConcurrentHashMap<String, Object>> getAsyncBigGoals(String content);
//    @Async
//    public CompletableFuture<ConcurrentHashMap<String, Object>> getAsyncSmallGoals(List<String> bigGoal);
//}
