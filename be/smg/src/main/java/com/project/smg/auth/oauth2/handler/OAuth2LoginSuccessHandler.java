package com.project.smg.auth.oauth2.handler;

import com.project.smg.auth.jwt.service.JwtService;
import com.project.smg.mandalart.service.MandalartService;
import com.project.smg.member.entity.Member;
import com.project.smg.member.entity.MemberPodo;
import com.project.smg.member.entity.RefreshToken;
import com.project.smg.member.repository.MemberPodoRepository;
import com.project.smg.member.repository.MemberRepository;
import com.project.smg.member.repository.RefreshTokenRepository;
import com.project.smg.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
//@Transactional
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;
    private final MemberPodoRepository memberPodoRepository;
    private final MemberService memberService;
    private final MandalartService mandalartService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공");
        try {
            DefaultOAuth2User oAuth2User = (DefaultOAuth2User) authentication.getPrincipal();
            loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
        } catch (Exception e) {
            throw e;
        }
    }

    private void loginSuccess(HttpServletResponse response, DefaultOAuth2User oAuth2User) throws IOException {
        String memberId = oAuth2User.getAttributes().get("id").toString();
        Optional<Member> findMember = memberRepository.findById(memberId);
        Member member = findMember.orElseThrow(() -> new IllegalStateException("유저가 존재하지 않음"));

        refreshTokenRepository.findByMemberId(member.getId())
                .ifPresentOrElse(refreshToken -> {
                            log.info("Refresh Token 있음");
                            String accessToken = jwtService.createAccessToken(memberId);
                            jwtService.accessTokenAddCookie(response, accessToken);
                            jwtService.refreshTokenAddCookie(response, refreshToken.getRefreshToken());
                        },
                        () -> {
                            log.info("Refresh Token 없음");
                            String accessToken = jwtService.createAccessToken(memberId);
                            jwtService.accessTokenAddCookie(response, accessToken);
                            String newRefreshToken = jwtService.createRefreshToken();
                            jwtService.refreshTokenAddCookie(response, newRefreshToken);
                            RefreshToken token = RefreshToken.builder()
                                    .refreshToken(newRefreshToken)
                                    .member(member)
                                    .build();
                            refreshTokenRepository.save(token);
                        });
        List<MemberPodo> memberPodoList = memberPodoRepository.findByPodoTypeId(memberId);

        if (memberPodoList.isEmpty())
            memberService.addMemberPodo(memberId);

        HashMap<String ,Object> mandalart = mandalartService.getMainMandalart(memberId);

        if(mandalart.isEmpty()){
            String redirectUrl = "https://shinemustget.com/create";
//            String redirectUrl = "http://localhost:3000/home";
            response.sendRedirect(redirectUrl);
        }
        else {
//            String redirectUrl = "localhost:8080/index";
            String redirectUrl = "https://shinemustget.com/home";
//            String redirectUrl = "http://localhost:3000/home";
            response.sendRedirect(redirectUrl);
        }
    }
}
