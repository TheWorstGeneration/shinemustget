package com.project.smg.auth.oauth2.handler;

import com.project.smg.auth.jwt.service.JwtService;
import com.project.smg.member.entity.Member;
import com.project.smg.member.entity.RefreshToken;
import com.project.smg.member.repository.MemberRepository;
import com.project.smg.member.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
//@Transactional
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공");
        try {
//            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
//            // User의 Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트
//            if(oAuth2User.getRole() == Role.GUEST) {
//                String accessToken = jwtService.createAccessToken(oAuth2User.getTestId());
//                response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
//
//                String redirectUrl = "http://j8b207.p.ssafy.io/preference?code=" + accessToken;
////                String redirectUrl = "http://localhost:3000/preference?code=" + accessToken;
//                response.sendRedirect(redirectUrl);
//            } else {
//                loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
//            }
            DefaultOAuth2User oAuth2User = (DefaultOAuth2User) authentication.getPrincipal();
            loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
        } catch (Exception e) {
            throw e;
        }

    }

    private void loginSuccess(HttpServletResponse response, DefaultOAuth2User oAuth2User) throws IOException {
        String memberId = oAuth2User.getAttributes().get("id").toString();
        Optional<Member> findMember =  memberRepository.findById(memberId);
        Member member = findMember.orElseThrow(() -> new IllegalStateException("유저가 존재하지 않음"));
//        String accessToken = jwtService.createAccessToken(memberId);
//        String refreshToken = jwtService.createRefreshToken();
        refreshTokenRepository.findByMemberId(member.getId())
                .ifPresentOrElse(refreshToken -> {
                            String accessToken = jwtService.createAccessToken(memberId);
                            jwtService.accessTokenAddCookie(response, accessToken);
                        }, () -> {
                    String accessToken = jwtService.createAccessToken(memberId);
                    jwtService.accessTokenAddCookie(response, accessToken);
                    System.out.println("login 1");
                    String newRefreshToken = jwtService.createRefreshToken();
                    jwtService.refreshTokenAddCookie(response, newRefreshToken);
                    System.out.println("login 2");
                    RefreshToken token = RefreshToken.builder()
                            .refreshToken(newRefreshToken)
                            .member(member)
                            .build();
                    refreshTokenRepository.save(token);
                });

        String redirectUrl = "http://localhost:8080";
//        String redirectUrl = "http://localhost:3000/mainpage";
        response.sendRedirect(redirectUrl);
    }
}
