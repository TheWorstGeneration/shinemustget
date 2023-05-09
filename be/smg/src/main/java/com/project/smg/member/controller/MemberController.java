package com.project.smg.member.controller;

import com.project.smg.common.ResponseDto;
import com.project.smg.member.dto.MemberInfoDto;
import com.project.smg.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    /**
     * 카카오 소셜 로그인 로그아웃 처리
     *
     * @param request  HTTP 요청 객체
     * @param response HTTP 응답 객체
     * @throws Exception response.sendRedirect() 메소드는 IOException을 발생시키는 Checked Exception 이므로 예외처리
     */
    @GetMapping("/kakaoLogout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        memberService.logout(request, response);
        return new ResponseEntity<>(new ResponseDto(200, "쿠키에서 토큰 만료 성공"), HttpStatus.OK);
    }

    /**
     * 로그인된 회원의 정보를 조회
     *
     * @param memberId 요청된 회원의 ID를 받는 RequestAttribute
     * @return HTTP 응답 객체와 함께 조회된 회원 정보를 전달
     * 조회된 회원이 없는 경우, HTTP 응답 객체와 함께 오류 메시지를 전달
     */
    @GetMapping("/memberInfo")
    public ResponseEntity<?> memberInfo(@RequestAttribute("id") String memberId) {
        MemberInfoDto memberInfoDto = memberService.memberInfo(memberId);
//        if (memberInfoDto != null) {
        log.info("프로필 조회 성공");
        return new ResponseEntity(memberInfoDto, HttpStatus.OK);
//        }
//        else {
//            log.info("프로필 조회 실패");
//            return new ResponseEntity<>(new ResponseDto(500, "존재하지 않는 유저 입니다."), HttpStatus.OK);
//        }
    }
}

