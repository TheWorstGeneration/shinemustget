package com.project.smg.member.controller;

import com.project.smg.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Stream;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @RequestMapping("/kakaoLogout")
    public void logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
//        HttpSession session = request.getSession();
//        String accessToken = (String) session.getAttribute("access_token");
//        System.out.println("kakaoLogout" + accessToken);
//        if (accessToken != null && !"".equals(accessToken)) {
//            memberService.logout(accessToken);
//            session.removeAttribute("access_token");
//            session.removeAttribute("user");
//
//            log.info("logout 성공");
//        }

        Optional<Cookie> optionalCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("accessToken"))
                .findFirst();
        optionalCookie.map(Stream::of)
                .orElseGet(Stream::empty)
                .forEach(cookie -> {
                    cookie.setValue(null);
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                });

        String redirectUrl = "http://shinemustget.com";
        response.sendRedirect(redirectUrl);
    }
}

