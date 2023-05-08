package com.project.smg.mandalart.controller;

import com.project.smg.common.ResponseDto;
import com.project.smg.mandalart.service.MandalartLikeService;
import com.project.smg.mandalart.service.MandalartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mandalart")
public class MandalartLikeController {
    private final MandalartLikeService mandalartLikeService;

    /* 만다라트 좋아요 */
    @PostMapping("/like/{id}")
    public ResponseEntity<?> like(@RequestAttribute("id") String mid, @PathVariable("id") int id){
        try {
            mandalartLikeService.mandalartLike(mid, id);
            return new ResponseEntity<>(new ResponseDto(200, "좋아요 변경 완료"), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(new ResponseDto(500, "좋아요 실패"), HttpStatus.OK);
        }

    }
}
