package com.project.smg.member.service;

import com.project.smg.member.dto.MemberInfoDto;
import com.project.smg.member.entity.Member;
import com.project.smg.member.entity.MemberPodo;
import com.project.smg.member.repository.MemberPodoRepository;
import com.project.smg.member.repository.MemberRepository;
import com.project.smg.podo.entity.PodoType;
import com.project.smg.podo.repository.PodoTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final String AUTHORIZATION = "Authorization";
    private final String BEARER_PREFIX = "Bearer ";
    private final String logoutURL = "https://kapi.kakao.com/v1/user/logout";
    private final MemberRepository memberRepository;
    private final PodoTypeRepository podoTypeRepository;
    private final MemberPodoRepository memberPodoRepository;

    /**
     * 로그아웃 서비스
     *
     * @param accessToken 카카오 토큰
     *                    세션으로 부터 가져온 카카오 토큰을 사용해 카카오에서 제공하는 엔드포인트로 요청을 보내 로그아웃 처리
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
     * member 닉네임, 프로필 사진 전달
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
    @Transactional
    public void addMemberPodo(String memberId) {
        List<PodoType> podoTypeList = podoTypeRepository.findAll();
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalStateException("존재하지 않는 유저"));

        for (int i = 0; i < podoTypeList.size(); i++) {
            boolean status = false;
            if (podoTypeList.get(i).getImageLockUrl() == null)
                status = true;

            MemberPodo memberPodo = MemberPodo.builder()
                    .member(member)
                    .podoType(podoTypeList.get(i))
                    .status(status)
                    .build();

            memberPodoRepository.save(memberPodo);
            log.info("멤버 포도 저장 {}", i + 1);
            memberPodo.addMember(member);
        }
    }

}
