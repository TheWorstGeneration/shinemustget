package com.project.smg.auth.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.project.smg.member.repository.RefreshTokenRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Getter
@Slf4j
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${cookie.access.expiration}")
    private int accessTokenCookieExpirationPeriod;

    @Value("${cookie.refresh.expiration}")
    private int refreshTokenCookieExpirationPeriod;


    /**
     * JWT의 Subject와 Claim으로 email 사용 -> 클레임의 name을 "id"으로 설정
     * JWT의 헤더에 들어오는 값 : 'Authorization(Key) = Bearer {토큰} (Value)' 형식
     */
    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String ID_CLAIM = "kakaoId";
    private static final String BEARER = "Bearer ";
    private final RefreshTokenRepository refreshTokenRepository;

    /**
     * AccessToken 생성
     */
    public String createAccessToken(String kakaoId) {
        Date now = new Date();
        log.info("지금시간 {}", now);
        return JWT.create() // JWT 토큰을 생성하는 빌더 반환
                .withSubject(ACCESS_TOKEN_SUBJECT) // JWT의 Subject 지정 -> AccessToken이므로 AccessToken
                .withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod)) // 토큰 만료 시간 설정
                .withClaim(ID_CLAIM, kakaoId)
                .sign(Algorithm.HMAC512(secretKey)); // HMAC512 알고리즘 사용, application-jwt.yml에서 지정한 secret 키로 암호화
    }

    /**
     * RefreshToken 생성
     * RefreshToken은 Claim에 id도 넣지 않으므로 withClaim() X
     */
    public String createRefreshToken() {
        Date now = new Date();
        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT)
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
                .sign(Algorithm.HMAC512(secretKey));
    }


    /**
     * REST API에서 사용
     * AccessToken 에서 id 추출
     */
    public String getUserIdFromToken(String token) {
        Optional<String> newToken = Optional.ofNullable(token)
                .map(accessToken -> {
                    try {
                        return URLDecoder.decode(accessToken, "UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        throw new RuntimeException(e);
                    }
                });
//                .filter(accessToken -> accessToken.startsWith(BEARER))
//                .map(accessToken -> accessToken.replace(BEARER, ""));

        log.info("내 토큰 = {}", newToken.get());

        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(secretKey))
                .build()
                .verify(newToken.get());

        String kakaoIdStr = decodedJWT.getClaim(ID_CLAIM).asString();  // ID_CLAIM 이름의 클레임에서 문자열 값을 추출하여 변수에 저장

        return kakaoIdStr;
    }

    /**
     * Filter에서 사용
     * AccessToken에서 id 추출
     * 추출 전에 JWT.require()로 검증기 생성
     * verify로 AceessToken 검증 후
     * 유효하다면 getClaim()으로 id 추출
     * 유효하지 않다면 빈 Optional 객체 반환
     */
    public Optional<String> extractId(String accessToken) {
        try {
            // 토큰 유효성 검사하는 데에 사용할 알고리즘이 있는 JWT verifier builder 반환
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build() // 반환된 빌더로 JWT verifier 생성
                    .verify(accessToken) // accessToken을 검증하고 유효하지 않다면 예외 발생
                    .getClaim(ID_CLAIM) // claim(id) 가져오기
                    .asString());
        } catch (Exception e) {
            log.error("액세스 토큰이 유효하지 않습니다.");
            return Optional.empty();
        }
    }

    /**
     * AccessToken 쿠키에 저장
     */
    public void accessTokenAddCookie(HttpServletResponse response, String accessToken) {
        try {
            String bearerToken = URLEncoder.encode(BEARER + accessToken, "UTF-8");
            Cookie cookie = new Cookie("accessToken", bearerToken);
            cookie.setPath("/");
            cookie.setDomain("shinemustget.com");
            cookie.setMaxAge(accessTokenCookieExpirationPeriod);
            cookie.setHttpOnly(true);
            response.addCookie(cookie);

            log.info("Access Token 쿠키에 저장 완료");
            log.info("발급된 Access Token : {}", accessToken);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    /**
     * RefreshToken 쿠키에 저장
     */
    public void refreshTokenAddCookie(HttpServletResponse response, String refreshToken) {
        try {
            String bearerToken = URLEncoder.encode(BEARER + refreshToken, "UTF-8");
            Cookie cookie = new Cookie("refreshToken", bearerToken);
            cookie.setPath("/");
            cookie.setDomain("shinemustget.com");
            cookie.setMaxAge(refreshTokenCookieExpirationPeriod);
            cookie.setHttpOnly(true);
            response.addCookie(cookie);

            log.info("Refresh Token 쿠키에 저장 완료");
            log.info("발급된 Refresh Token : {}", refreshToken);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }


    /**
     * 쿠키에서 AccessToken 추출
     * 토큰 형식 : Bearer XXX에서 Bearer를 제외하고 순수 토큰만 가져오기 위해서
     * 쿠키를 가져온 후 "Bearer"를 삭제(""로 replace)
     */
    public Optional<String> extractAccessToken(HttpServletRequest request) {
//        return Optional.ofNullable(Arrays.stream(request.getCookies())
//                        .filter(cookie -> cookie.getName().equals("accessToken"))
//                        .findFirst().map(Cookie::getValue)
//                        .orElse(null))
//                .map(accessToken -> {
//                    try {
//                        return URLDecoder.decode(accessToken, "UTF-8");
//                    } catch (UnsupportedEncodingException e) {
//                        throw new RuntimeException(e);
//                    }
//                })
//                .filter(accessToken -> accessToken.startsWith(BEARER))
//                .map(accessToken -> accessToken.replace(BEARER, ""));
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return Optional.empty();
        }

        return Optional.ofNullable(Arrays.stream(cookies)
                        .filter(cookie -> cookie.getName().equals("accessToken"))
                        .findFirst()
                        .map(Cookie::getValue)
                        .orElse(null))
                .map(accessToken -> {
                    try {
                        return URLDecoder.decode(accessToken, "UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        throw new RuntimeException(e);
                    }
                })
                .filter(accessToken -> accessToken.startsWith(BEARER))
                .map(accessToken -> accessToken.replace(BEARER, ""));
    }

    /**
     * 쿠키에서 RccessToken 추출
     * 토큰 형식 : Bearer XXX에서 Bearer를 제외하고 순수 토큰만 가져오기 위해서
     * 쿠키를 가져온 후 "Bearer"를 삭제(""로 replace)
     */
    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(Arrays.stream(request.getCookies())
                        .filter(c -> c.getName().equals("refreshToken"))
                        .findFirst().map(Cookie::getValue)
                        .orElse(null))
                .map(accessToken -> {
                    try {
                        return URLDecoder.decode(accessToken, "UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        throw new RuntimeException(e);
                    }
                })
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    /**
     * RefreshToken DB 저장(업데이트)
     */
    @Transactional
    public void updateRefreshToken(String kakaoId, String refreshToken) {
        refreshTokenRepository.findByMemberId(kakaoId)
                .ifPresentOrElse(
                        token -> token.setRefreshToken(refreshToken),
                        () -> new Exception("일치하는 회원이 없습니다.")
                );
    }

    /**
     * 토큰 유효성 검증
     */
    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
            return true;
        } catch (Exception e) {
            log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
            return false;
        }
    }
}
