package com.project.smg.mandalart.controller;

import com.project.smg.common.ResponseDto;
import com.project.smg.mandalart.dto.InputRequest;
import com.project.smg.mandalart.dto.SmallGoalRequestDto;
import com.project.smg.mandalart.service.MandalartService;
import com.project.smg.podo.dto.PodoCreateDto;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mandalart")
public class MandalartController {
    private final MandalartService mandalartService;

    @GetMapping("/big-goal/{content}")
    public ResponseEntity<?> getBigGoal(@PathVariable String content){
        HashMap<String, List<String>> bigGoals = mandalartService.getBigGoals(content);
        if(bigGoals.isEmpty()) return new ResponseEntity<>(new ResponseDto(500, "최종 목표 조회 실패"), HttpStatus.OK);
        return ResponseEntity.status(HttpStatus.OK).body(bigGoals);
    }

    @GetMapping("/small-goal")
    public ResponseEntity<?> getSmallGoal(@RequestBody SmallGoalRequestDto smallGoalRequestDto){
        HashMap<String, List<String>> smallGoals = mandalartService.getSmallGoals(smallGoalRequestDto.getBigGoal());
        if(smallGoals.isEmpty()) return new ResponseEntity<>(new ResponseDto(500, "중간 목표 조회 실패"), HttpStatus.OK);
        return new ResponseEntity<>(smallGoals, HttpStatus.OK);
    }

}
