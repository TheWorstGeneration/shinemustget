package com.project.smg.mandalart.controller;

import com.project.smg.common.ResponseDto;
import com.project.smg.mandalart.dto.MandalartRequestDto;
import com.project.smg.mandalart.dto.SmallGoalRequestDto;
import com.project.smg.mandalart.service.MandalartService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mandalart")
public class MandalartController {
    private final MandalartService mandalartService;

    @GetMapping("/big-goal/{content}")
    public CompletableFuture<ResponseEntity<?>> getBigGoal(@PathVariable String content) throws InterruptedException, ExecutionException{
        CompletableFuture<ConcurrentHashMap<String, Object>> bigGoals = mandalartService.getBigGoals(content);
        return bigGoals.thenApply(stringObjectConcurrentHashMap -> {
            if(stringObjectConcurrentHashMap.isEmpty()) {
                return new ResponseEntity<>(new ResponseDto(500, "최종 목표 조회 실패"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(stringObjectConcurrentHashMap, HttpStatus.OK);
            }
        });
    }

    @GetMapping("/small-goal")
    public CompletableFuture<ResponseEntity<?>> getSmallGoal(@RequestBody SmallGoalRequestDto smallGoalRequestDto) throws InterruptedException, ExecutionException{
        CompletableFuture<ConcurrentHashMap<String, Object>> asyncBigGoals = mandalartService.getSmallGoals(smallGoalRequestDto.getBigGoal());
        return asyncBigGoals.thenApply(stringObjectConcurrentHashMap -> {
            if(stringObjectConcurrentHashMap.isEmpty()) {
                return new ResponseEntity<>(new ResponseDto(500, "중간 목표 조회 실패"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(stringObjectConcurrentHashMap, HttpStatus.OK);
            }
        });
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMandalart(@RequestAttribute("id") String mid, @RequestBody MandalartRequestDto mandalartRequestDto){
        mandalartService.createMandalart(mandalartRequestDto, mid);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
