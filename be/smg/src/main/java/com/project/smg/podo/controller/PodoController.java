package com.project.smg.podo.controller;

import com.project.smg.common.ResponseDto;
import com.project.smg.podo.dto.PodoCreateDto;
import com.project.smg.podo.dto.StickerDto;
import com.project.smg.podo.service.PodoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/podo")
public class PodoController {
    private final PodoService podoService;



    /* 포도알 작성 */
    @PostMapping(value = "/write")
    public ResponseEntity<?> podoCreate(@RequestAttribute("id") String mid, @RequestBody PodoCreateDto podoCreateDto){
        try {
            podoService.create(mid, podoCreateDto);
            return new ResponseEntity<>(new ResponseDto(201, "작성 완료"), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(new ResponseDto(500, "작성 실패"), HttpStatus.OK);
        }
    }




    /* 포도알 조회 */
    @GetMapping(value = "/readPodo/{id}")
    public ResponseEntity<?> readPodo(@RequestAttribute("id") String mid,
                                      @PathVariable("id") int id){
        Map <String, Object> result = podoService.read(mid, id);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);

        } return new ResponseEntity<>(new ResponseDto(500, "잘못된 페이지 번호입니다"), HttpStatus.OK);
    }

    /* 포도알 설정 */
//    @PostMapping(value = "/setting")
//    /* 포도송이 조회 */
//    @PostMapping(value = "/detail")

    /* 포도알 종류 조회 */
    @GetMapping(value = "/mySticker")
    public ResponseEntity<?> mySticker(@RequestAttribute("id") String mid){
        List<StickerDto> stickerList = podoService.sticker(mid);

        if (stickerList != null) {
            return new ResponseEntity<>(stickerList, HttpStatus.OK);
        }else return new ResponseEntity<>(new ResponseDto(500, "반환 실패"), HttpStatus.OK);
    }
}
