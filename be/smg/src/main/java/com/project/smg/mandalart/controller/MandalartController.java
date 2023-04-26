package com.project.smg.mandalart.controller;

import com.project.smg.mandalart.dto.ChatGptResponse;
import com.project.smg.mandalart.dto.InputRequest;
import com.project.smg.mandalart.service.MandalartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mandalart")
public class MandalartController {
    private final MandalartService mandalartService;

    @GetMapping("/big-goal/{content}")
    public ResponseEntity<HashMap<String, List<String>>> getBigGoal(@PathVariable String content){
        HashMap<String, List<String>> bigGoals = mandalartService.getBigGoals(content);
        return ResponseEntity.status(HttpStatus.OK).body(bigGoals);
    }
}
