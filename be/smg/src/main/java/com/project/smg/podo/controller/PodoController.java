package com.project.smg.podo.controller;

import com.project.smg.common.ResponseDto;
import com.project.smg.podo.dto.PodoCreateDto;
import com.project.smg.podo.service.PodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Podo")
public class PodoController {
    private final PodoService podoService;



    /* 포도알 작성 */
    @PostMapping(value = "/write")
    public ResponseEntity<?> podoCreate(@RequestHeader("Authorization") String token, @RequestBody PodoCreateDto podoCreateDto){
        try {
            podoService.create(token, podoCreateDto);
        } catch (Exception e){
            return new ResponseEntity<>(new ResponseDto(201, "작성 완료"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDto(500, "작성 실패"), HttpStatus.OK);
    }





//    /* 포도알 조회 */
//    @PostMapping(value = "/write")
//
//    /* 포도알 설정 */
//    @PostMapping(value = "/write")
//    /* 포도송이 조회 */
//    @PostMapping(value = "/write")
//    /* 포도알 종류 조회 */
//    @PostMapping(value = "/write")
//
}
