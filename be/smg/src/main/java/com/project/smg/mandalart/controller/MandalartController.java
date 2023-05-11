package com.project.smg.mandalart.controller;

import com.project.smg.mandalart.dto.MandalartRequestDto;
import com.project.smg.mandalart.dto.SearchDetailResponseDto;
import com.project.smg.mandalart.dto.SmallGoalRequestDto;
import com.project.smg.mandalart.service.MandalartService;

import com.project.smg.member.dto.SearchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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
//            if(stringObjectConcurrentHashMap.isEmpty()) {
//                return new ResponseEntity<>(new ResponseDto(500, "최종 목표 조회 실패"), HttpStatus.OK);
//            } else {
            return new ResponseEntity<>(stringObjectConcurrentHashMap, HttpStatus.OK);
//            }
        });
    }

    @PostMapping("/small-goal")
    public CompletableFuture<ResponseEntity<?>> getSmallGoal(@RequestBody SmallGoalRequestDto smallGoalRequestDto) throws InterruptedException, ExecutionException{
        CompletableFuture<ConcurrentHashMap<String, Object>> asyncBigGoals = mandalartService.getSmallGoals(smallGoalRequestDto.getBigGoal());
        return asyncBigGoals.thenApply(stringObjectConcurrentHashMap -> {
//            if(stringObjectConcurrentHashMap.isEmpty()) {
//                return new ResponseEntity<>(new ResponseDto(500, "중간 목표 조회 실패"), HttpStatus.OK);
//            } else {
            return new ResponseEntity<>(stringObjectConcurrentHashMap, HttpStatus.OK);
//            }
        });
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMandalart(@RequestAttribute("id") String mid, @RequestBody MandalartRequestDto mandalartRequestDto){
        mandalartService.createMandalart(mandalartRequestDto, mid);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/readMain")
    public ResponseEntity<?> getMainMandalart(@RequestAttribute("id") String mid){
        HashMap<String, Object> mainMandalart = mandalartService.getMainMandalart(mid);
//        if(mainMandalart.isEmpty()) return new ResponseEntity<>(new ResponseDto(500, "메인 만타라트 조회 실패"), HttpStatus.OK);
        return new ResponseEntity<>(mainMandalart, HttpStatus.OK);
    }

    @GetMapping("/searchDetail/{id}")
    public ResponseEntity<?> getSearchDetail(@RequestAttribute("id") String mid, @PathVariable int id){
        SearchDetailResponseDto searchDetail = mandalartService.getSearchDetail(mid, id);
//        if(searchDetail == null) return new ResponseEntity<   >(new ResponseDto(500, "만다라트 상세 조회 실패"), HttpStatus.OK);
        return new ResponseEntity<>(searchDetail, HttpStatus.OK);
    }

    @GetMapping("/search/{word}/{pageNo}")
    public ResponseEntity<?> getSearch(@RequestAttribute("id") String mid, @PathVariable String word, @PathVariable String pageNo){
        List<SearchDto> searchMandalart = mandalartService.getSearchMandalart(mid, word, pageNo);
//        if(searchMandalart.isEmpty()) return new ResponseEntity<>(new ResponseDto(500, "검색 실패"), HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(searchMandalart, HttpStatus.OK);
    }

    @PostMapping("/clear/{id}")
    public ResponseEntity<?> clearGoal(@RequestAttribute("id") String mid, @PathVariable int id){
        mandalartService.clearGoal(mid, id);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
