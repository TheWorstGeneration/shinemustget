package com.project.smg.mandalart.controller;

import com.project.smg.common.ResponseDto;
import com.project.smg.mandalart.service.MandalartLikeService;
import com.project.smg.mandalart.service.MandalartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mandalart")
public class MandalartLikeController {
    private final MandalartLikeService mandalartLikeService;

    @GetMapping("/home")
    public String get(){
        return "eeeee";
    }
}
