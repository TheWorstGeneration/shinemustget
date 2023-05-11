package com.project.smg.auth.jwt.filter;

import com.project.smg.auth.jwt.service.JwtService;
import com.project.smg.auth.jwt.util.PasswordUtil;
import com.project.smg.member.entity.Member;
import com.project.smg.member.repository.MemberRepository;
import com.project.smg.member.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Jwt 인증 필터
 * "/login" 이외의 URI 요청이 왔을 때 처리하는 필터
 * <p>
 * 기본적으로 사용자는 요청 헤더에 AccessToken만 담아서 요청
 * AccessToken 만료 시에만 RefreshToken을 요청 헤더에 AccessToken과 함께 요청
 * <p>
 * 1. RefreshToken이 없고, AccessToken이 유효한 경우 -> 인증 성공 처리, RefreshToken을 재발급하지는 않는다.
 * 2. RefreshToken이 없고, AccessToken이 없거나 유효하지 않은 경우 -> 인증 실패 처리, 403 ERROR
 * 3. RefreshToken이 있는 경우 -> DB의 RefreshToken과 비교하여 일치하면 AccessToken 재발급, RefreshToken 재발급(RTR 방식)
 * 인증 성공 처리는 하지 않고 실패 처리
 */
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {
    private static final String[] NO_CHECK_URLS = {"/swagger-ui", "/login", "/actuator"};
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("필터 시작");
        log.info("Access Token 쿠키에서 조회");

        //필터 제외 url 체크
        for (int i = 0; i < NO_CHECK_URLS.length; i++) {
            if (request.getRequestURI().startsWith(NO_CHECK_URLS[i])) {
                filterChain.doFilter(request, response); // "/login" 요청이 들어오면, 다음 필터 호출
                log.info("필터 제외 url");
                return;
            }
        }

        // 로컬테스트용
        if (request.getHeader("id") != null) {
            log.info("로컬 테스트 사용");
            request.setAttribute("id", request.getHeader("id"));
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = jwtService.extractAccessToken(request)
                .filter(jwtService::isTokenValid)
                .orElse(null);

        log.info("Access Token : {}", accessToken);

        if (accessToken == null) {
            log.info("필터에서 Refresh Token 사용");
            log.info("Refresh Token 쿠키에서 조회");

            String refreshToken = jwtService.extractRefreshToken(request)
                    .filter(jwtService::isTokenValid)
                    .orElse(null);

            log.info("Refresh Token : {}", refreshToken);

            Member member = memberRepository.findByRefreshToken(refreshToken)
                    .orElseThrow(() -> new IllegalStateException("존재하지 않는 유저"));
            String memberId = member.getId();

            checkRefreshTokenAndReIssueAccessToken(response, memberId);
            request.setAttribute("id", memberId);
            filterChain.doFilter(request, response);
            return;
        }

        if (accessToken != null) {
            log.info("필터에서 Access Token 사용");
            jwtService.extractId(accessToken)
                    .ifPresent(id -> memberRepository.findById(id)
                            .ifPresent(this::saveAuthentication));
            String memberId = jwtService.getUserIdFromToken(accessToken);
            request.setAttribute("id", memberId);

            filterChain.doFilter(request, response);
        }
    }

    /**
     * [쿠키에 저장된 리프레시 토큰 확인 & 액세스 토큰/리프레시 토큰 재발급 메소드]
     * 엑세스 토큰 만료 시 리프레시 토큰 검증 과정을 통해 엑세스 토큰 재발급
     * reIssueRefreshToken()로 리프레시 토큰 재발급 & DB에 리프레시 토큰 업데이트 메소드 호출
     * 그 후 JwtService.refreshTokenAddCookie()으로 쿠키에 리프레시 토큰 저장
     */

    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String memberId) {
        String reIssuedRefreshToken = reIssueRefreshToken(memberId);
        String reIssuedAccessToken = jwtService.createAccessToken(memberId);
        jwtService.refreshTokenAddCookie(response, reIssuedRefreshToken);
        jwtService.accessTokenAddCookie(response, reIssuedAccessToken);
    }

    /**
     * [리프레시 토큰 재발급 & DB에 리프레시 토큰 업데이트 메소드]
     * jwtService.createRefreshToken()으로 리프레시 토큰 재발급 후
     * DB에 재발급한 리프레시 토큰 업데이트 후 Flush
     */
    private String reIssueRefreshToken(String memberId) {
        String reIssuedRefreshToken = jwtService.createRefreshToken();
        jwtService.updateRefreshToken(memberId, reIssuedRefreshToken);
        return reIssuedRefreshToken;
    }

    /**
     * [인증 허가 메소드]
     * 파라미터의 유저 : 우리가 만든 회원 객체 / 빌더의 유저 : UserDetails의 User 객체
     * <p>
     * new UsernamePasswordAuthenticationToken()로 인증 객체인 Authentication 객체 생성
     * UsernamePasswordAuthenticationToken의 파라미터
     * 1. 위에서 만든 UserDetailsUser 객체 (유저 정보)
     * 2. credential(보통 비밀번호로, 인증 시에는 보통 null로 제거)
     * 3. Collection < ? extends GrantedAuthority>로,
     * UserDetails의 User 객체 안에 Set<GrantedAuthority> authorities이 있어서 getter로 호출한 후에,
     * new NullAuthoritiesMapper()로 GrantedAuthoritiesMapper 객체를 생성하고 mapAuthorities()에 담기
     * <p>
     * SecurityContextHolder.getContext()로 SecurityContext를 꺼낸 후,
     * setAuthentication()을 이용하여 위에서 만든 Authentication 객체에 대한 인증 허가 처리
     */
    public void saveAuthentication(Member myUser) {
        String password = myUser.getPassword();
        if (password == null) { // 소셜 로그인 유저의 비밀번호 임의로 설정 하여 소셜 로그인 유저도 인증 되도록 설정
            password = PasswordUtil.generateRandomPassword();
        }

        UserDetails userDetailsUser = org.springframework.security.core.userdetails.User.builder()
                .username(myUser.getId().toString())
                .password(password)
                .roles(myUser.getRole().name())
                .build();

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(userDetailsUser, null,
                        authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
