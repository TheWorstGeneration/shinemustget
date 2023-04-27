package com.project.smg.podo.controller;

import com.project.smg.common.ResponseDto;
import com.project.smg.podo.dto.PodoCreateDto;
import com.project.smg.podo.dto.StickerDto;
import com.project.smg.podo.service.PodoService;
import io.swagger.v3.oas.annotations.headers.Header;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/podo")
public class PodoController {
    private final PodoService podoService;



    /* 포도알 작성 */
    @PostMapping(value = "/write")
    public ResponseEntity<?> podoCreate(@CookieValue("accessToken") String token, @RequestBody PodoCreateDto podoCreateDto){
        try {
            podoService.create(token, podoCreateDto);
        } catch (Exception e){
            return new ResponseEntity<>(new ResponseDto(201, "작성 완료"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseDto(500, "작성 실패"), HttpStatus.OK);
    }




    /* 포도알 조회 */
    @GetMapping(value = "/readPodo/{id}")
    public ResponseEntity<?> readPodo(@CookieValue("accessToken") String token,
                                      @PathVariable("id") int id,
                                      @RequestParam(value = "page", defaultValue = "0") int page){
        PageRequest pageRequest = PageRequest.of(page, 26, Sort.by("id").ascending());
        Map <String, Object> result = podoService.read(token, pageRequest, id, page);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);

        } return new ResponseEntity<>(new ResponseDto(500, "잘못된 페이지 번호입니다"), HttpStatus.OK);
    }

    /* 포도알 설정 */
//    @PostMapping(value = "/write")
//    /* 포도송이 조회 */
//    @PostMapping(value = "/write")

    /* 포도알 종류 조회 */
    @GetMapping(value = "/mySticker")
    public ResponseEntity<?> mySticker(@CookieValue("accessToken") String token){
        List<StickerDto> stickerList = podoService.sticker(token);

        if (stickerList != null) {
            return new ResponseEntity<>(stickerList, HttpStatus.OK);
        }else return new ResponseEntity<>(new ResponseDto(500, "반환 실패"), HttpStatus.OK);
    }
}
