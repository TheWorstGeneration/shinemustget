package com.project.smg.podo.service;

import com.project.smg.mandalart.entity.SmallGoal;
import com.project.smg.mandalart.repository.SmallGoalRepository;
import com.project.smg.member.entity.Member;
import com.project.smg.member.entity.MemberPodo;
import com.project.smg.member.repository.MemberRepository;
import com.project.smg.podo.dto.PodoCreateDto;
import com.project.smg.podo.dto.StickerDto;
import com.project.smg.podo.entity.Podo;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PodoServiceImpl implements PodoService {
    private final MemberRepository memberRepository;
    private final SmallGoalRepository smallGoalRepository;
    /**
     * 포도알 작성하기
     * */
    @Override
    public void create(String token, PodoCreateDto podoCreateDto) {
        // 멤버 확인
        Member member = checkMember(token);

        // small goal 확인
        Optional<SmallGoal> smallGoal = smallGoalRepository.findById(podoCreateDto.getId());

        // 스티커 찾기


        // podo db 저장
//        Podo podo = Podo.builder()
//                .smallGoal()
//                .podoType()
//                .oneline()
//        podoCreateDto.ge


    }


    /**
     * 회원 스티커 종류
     * */
    @Override
    public List<StickerDto> sticker(String token) {
        // 멤버 확인
        Member member = checkMember(token);
        List<MemberPodo> memberPodos = member.getMemberPodos();
        for (MemberPodo memberPodo: memberPodos){
            memberPodo.getPodoType().getName();
            memberPodo.getPodoType().getImageUrl();
        }

        return null;
    }


    private Member checkMember(String token) {
        Optional<Member> member = memberRepository.findById(token);
        Member findMember = member.orElseThrow(() -> new IllegalStateException("회원이 존재하지 않습니다.") );
        return findMember;
    }
}
