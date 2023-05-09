package com.project.smg.auth.oauth2.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class OAuth2LoginFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
//        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//        response.getWriter().write("소셜 로그인 실패! 서버 로그를 확인해주세요.");
//        log.info("소셜 로그인에 실패했습니다. 에러 메시지 : {}", exception.getMessage());
        if (exception instanceof OAuth2AuthenticationException) {
            OAuth2Error error = ((OAuth2AuthenticationException) exception).getError();
            log.error("OAuth2 Login Failed: {}, {}", error.getErrorCode(), error.getDescription());
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("소셜 로그인 실패! 서버 로그를 확인해주세요.");
        } else {
            log.error("OAuth2 Login Failed: {}", exception.getMessage());
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("소셜 로그인 실패! 서버 로그를 확인해주세요.");
        }
    }
}
