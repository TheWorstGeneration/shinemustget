package com.project.smg.podo.service;


import com.project.smg.auth.jwt.service.JwtService;
import com.project.smg.mandalart.entity.SmallGoal;
import com.project.smg.mandalart.repository.SmallGoalRepository;
import com.project.smg.member.entity.Member;
import com.project.smg.member.entity.MemberPodo;
import com.project.smg.member.repository.MemberPodoRepository;
import com.project.smg.member.repository.MemberRepository;
import com.project.smg.podo.dto.PodoDto;
import com.project.smg.podo.repository.PodoRepository;
import com.project.smg.podo.repository.PodoTypeRepository;
import com.project.smg.podo.dto.PodoCreateDto;
import com.project.smg.podo.dto.StickerDto;
import com.project.smg.podo.entity.Podo;
import com.project.smg.podo.entity.PodoType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.*;
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
     * 포도송이 조회
     */

    @Override
    public Map<String, Object> read(String token, PageRequest pageRequest, int id, int page) {
        // 멤버 확인
        Member member = checkMember(token);
        Map<String, Object> result = new HashMap<>();
        Page<Podo> podos = podoRepository.findBySmallGoalId(id ,pageRequest);

        // map stream 으로 변경해보기
//        List<PodoDto> podoList = new ArrayList<>();
//        for (Podo podo : podos){
//            PodoDto podoDto = new PodoDto(podo.getId(), podo.getOneline(), podo.getMemberPodo().getPodoType().getImageUrl());
//            podoList.add(podoDto);
//        }
        List<PodoDto> podoList = podos.stream()
                .map(o -> new PodoDto(o.getId(), o.getOneline(), o.getMemberPodo().getPodoType().getImageUrl()))
                .collect(Collectors.toList());


        // 이전, 이후 페이지 존재 여부 확인
        int totalcnt = podos.getTotalPages()-1;

        // 잘못된 페이지 요청 시 종료
        if (page> totalcnt){
            return null;
        }
        if (page ==0 && totalcnt ==0){
            result.put("isUp", false);
            result.put("isDown", false);
        } else if (page == totalcnt && page!=0) {
            result.put("isDown", false);
            result.put("isUp",true);
        }else if(page != totalcnt && page ==0) {
            result.put("isDown", true);
            result.put("isUp",false);
        }else {
            result.put("isDown", true);
            result.put("isUp",true);
        }

        return result;
    }


    /**
     * 포도알 작성하기
     */

    @Override
    public void create(String id, PodoCreateDto podoCreateDto) {
        // 멤버 확인
        Member member = checkMember(id);

        // small goal 확인
        Optional<SmallGoal> smallGoal = smallGoalRepository.findById(podoCreateDto.getId());
        SmallGoal findSmallGoal = smallGoal.orElseThrow(() -> new IllegalStateException("세부 목표가 존재하지 않습니다."));

        // podoType 찾기
        PodoType podoType = podoTypeRepository.findByImageUrl(podoCreateDto.getStickerType());

        // MemberPodo 조회
        MemberPodo memberPodo = memberPodoRepository.findByName(podoType.getName());

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
    //TODO: 스티커가 없다면 잠긴 스티커 나오게
    @Override
    public List<StickerDto> sticker(String id) {
        // 멤버 확인
        Member member = checkMember(id);

        // 멤버가 가진 포도 스티커 id 리스트
        List<Integer> podoStickersId = memberPodoRepository.findByPodoTypeId(id);

        // 모든 포도 스티커
        List<PodoType> podoTypes = podoTypeRepository.findAll();

        // 모든 포도 스티커와 내가 가진 포도 스티커를 비교하며 가지고 있는지 확인
        List<StickerDto> stickerList = new ArrayList<>();
        /*
        for (PodoType podoType : podoTypes){
            Boolean isMine = false;
            if(podoStickersId.contains(podoType.getId())){
                isMine=true;
            }
            StickerDto stickerDto = new StickerDto(podoType.getId(), podoType.getImageUrl());
            stickerList.add(stickerDto);
        }
*/
        return stickerList;
    }

    private Member checkMember(String id) {
        Optional<Member> member = memberRepository.findById(id);
        Member findMember = member.orElseThrow(() -> new IllegalStateException("회원이 존재하지 않습니다."));
        return findMember;
    }
}
