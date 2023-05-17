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

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final PodoTypeRepository podoTypeRepository;
    private final MemberPodoRepository memberPodoRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        // HTTP 쿠키에서 accessToken 쿠키를 찾아서 만료시키기
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

        if (member == null)
            return null;

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
