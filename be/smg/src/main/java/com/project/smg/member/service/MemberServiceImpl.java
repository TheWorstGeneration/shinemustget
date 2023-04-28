package com.project.smg.member.service;

import com.project.smg.member.dto.MemberInfoDto;
import com.project.smg.member.entity.Member;
import com.project.smg.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final String AUTHORIZATION = "Authorization";
    private final String BEARER_PREFIX = "Bearer ";
    private final String logoutURL = "https://kapi.kakao.com/v1/user/logout";
    private final MemberRepository memberRepository;

    /**
     * 로그아웃 서비스
     * @param accessToken 카카오 토큰
     * 세션으로 부터 가져온 카카오 토큰을 사용해 카카오에서 제공하는 엔드포인트로 요청을 보내 로그아웃 처리
     */
    @Override
    public void logout(String accessToken) {
        try {
            URL url = new URL(logoutURL);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty(AUTHORIZATION, BEARER_PREFIX + accessToken);

            conn.disconnect();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     *
     * @param memberId
     * @return memberId로 DB를 조회해 member의 닉네임과 프로필사진을 전달
     */
    @Override
    public MemberInfoDto memberInfo(String memberId) {
        Member member = memberRepository.findById(memberId)
                .orElse(null);

        MemberInfoDto memberInfoDto = new MemberInfoDto(member.getNickname(), member.getImageUrl());
        return memberInfoDto;
    }

    @Override
    public void addMemberPodo(String accessToken) {

    }


}
