package com.project.smg.podo.service;


import com.project.smg.auth.jwt.service.JwtService;
import com.project.smg.mandalart.entity.SmallGoal;
import com.project.smg.mandalart.repository.SmallGoalRepository;
import com.project.smg.member.entity.Member;
import com.project.smg.member.entity.MemberPodo;
import com.project.smg.member.repository.MemberPodoRepository;
import com.project.smg.member.repository.MemberRepository;
import com.project.smg.podo.repository.PodoRepository;
import com.project.smg.podo.repository.PodoTypeRepository;
import com.project.smg.podo.dto.PodoCreateDto;
import com.project.smg.podo.dto.StickerDto;
import com.project.smg.podo.entity.Podo;
import com.project.smg.podo.entity.PodoType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PodoServiceImpl implements PodoService {
    private final MemberRepository memberRepository;
    private final SmallGoalRepository smallGoalRepository;
    private final MemberPodoRepository memberPodoRepository;
    private final PodoTypeRepository podoTypeRepository;
    private final PodoRepository podoRepository;
    private final JwtService jwtService;
    private final EntityManager em;

    /**
     * 포도알 작성하기
     */
    @Override
    public void create(String token, PodoCreateDto podoCreateDto) {
        // 멤버 확인
        Member member = checkMember(token);

        // small goal 확인
        Optional<SmallGoal> smallGoal = smallGoalRepository.findById(podoCreateDto.getId());
        SmallGoal findSmallGoal = smallGoal.orElseThrow(() -> new IllegalStateException("세부 목표가 존재하지 않습니다."));

        // podoType 찾기
        PodoType podoType = podoTypeRepository.findByName(podoCreateDto.getStickerType());

        // MemberPodo 생성 및 DB 저장
        MemberPodo memberPodo = MemberPodo.builder()
                .member(member)
                .podoType(podoType)
                .build();
        memberPodoRepository.save(memberPodo);

        // podo 생성 및 DB 저장
        Podo podo = Podo.builder()
                .oneline(podoCreateDto.getOneline())
                .createdAt(LocalDateTime.now())
                .memberPodo(memberPodo)
                .smallGoal(findSmallGoal)
                .build();
        podoRepository.save(podo);

    }


    /**
     * 회원 스티커 종류
     */
    @Override
    public List<StickerDto> sticker(String token) {
        // 멤버 확인
        Member member = checkMember(token);

        // 멤버가 가진 포도 스티커 id 리스트
        List<Integer> podoStickersId = memberPodoRepository.findByName(member.getId());

        // 모든 포도 스티커
        List<PodoType> podoTypes = podoTypeRepository.findAll();

        // 모든 포도 스티커와 내가 가진 포도 스티커를 비교하며 가지고 있는지 확인
        List<StickerDto> stickerDtos = new ArrayList<>();
        for (PodoType podoType : podoTypes){
            Boolean isMine = false;
            if(podoStickersId.contains(podoType.getId())){
                isMine=true;
            }
            StickerDto stickerDto = new StickerDto(podoType.getId(), isMine, podoType.getImageUrl());
            stickerDtos.add(stickerDto);
        }

        return stickerDtos;
    }


    private Member checkMember(String token) {
        String id = jwtService.getUserIdFromToken(token);
        Optional<Member> member = memberRepository.findById(id);
        Member findMember = member.orElseThrow(() -> new IllegalStateException("회원이 존재하지 않습니다."));
        return findMember;
    }
}
