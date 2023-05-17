package com.project.smg.mandalart.controller;

import com.project.smg.common.ResponseDto;
import com.project.smg.mandalart.service.MandalartLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mandalart")
public class MandalartLikeController {
    private final MandalartLikeService mandalartLikeService;

    /* 만다라트 좋아요 */
    @PostMapping("/like/{id}")
    public ResponseEntity<?> like(@RequestAttribute("id") String mid, @PathVariable("id") int id) throws Exception {
//        try {
        mandalartLikeService.mandalartLike(mid, id);
        return new ResponseEntity<>(new ResponseDto(200, "좋아요 변경 완료"), HttpStatus.OK);
//        } catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity<>(new ResponseDto(500, "좋아요 실패"), HttpStatus.OK);
//        }

    }


    @GetMapping("/liketest/{id}")
    public ResponseEntity<?> liketest(@RequestAttribute("id") String mid, @PathVariable("id") int id) {
        Map<String, Object> result = new HashMap<>();
        try {
            boolean mandalartLike = mandalartLikeService.isMandalartLike(mid, id);
            int i = mandalartLikeService.mandalartLikeCnt(id);
            result.put("좋아요 여부", mandalartLike);
            result.put("좋아요 개수", i);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponseDto(500, "테스트 실패"), HttpStatus.OK);
        }

    }
}
