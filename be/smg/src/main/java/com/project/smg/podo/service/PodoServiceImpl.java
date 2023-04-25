package com.project.smg.podo.service;

import com.project.smg.member.entity.Member;
import com.project.smg.member.repository.MemberRepository;
import com.project.smg.podo.dto.PodoCreateDto;
import com.project.smg.podo.entity.Podo;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PodoServiceImpl implements PodoService {
    private final MemberRepository memberRepository;
    /**
     * 포도알 작성하기
     * */
    @Override
    public void create(String token, PodoCreateDto podoCreateDto) {
        Optional<Member> member = memberRepository.findById(token);
        Member findMember = member.orElseThrow(() -> new IllegalStateException("회원이 존재하지 않습니다.") );

        // small goal id 로 small goal 찾기
        // 스티커 찾기
        // podo db 저장
//        Podo podo = Podo.builder()
//                .smallGoal()
//                .podoType()
//                .oneline()
//        podoCreateDto.ge


    }
}
