package com.project.smg.podo.service;


import com.project.smg.mandalart.entity.SmallGoal;
import com.project.smg.mandalart.repository.SmallGoalRepository;
import com.project.smg.member.entity.Member;
import com.project.smg.member.entity.MemberPodo;
import com.project.smg.member.repository.MemberPodoRepository;
import com.project.smg.member.repository.MemberRepository;
import com.project.smg.podo.dto.*;
import com.project.smg.podo.repository.PodoRepository;
import com.project.smg.podo.repository.PodoTypeRepository;
import com.project.smg.podo.entity.Podo;
import com.project.smg.podo.entity.PodoType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.logging.Logger;
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

    /** 포도송이 조회 */
    @Override
    public Map<String, Object> read(String mid, int id) {

        Map<String, Object> result = new HashMap<>();
        List<Podo> podos = podoRepository.findBySmallGoalId(id);

        List<PodoDto> podoDtoList = podos.stream()
        .map(o -> new PodoDto(o.getId(),  o.getMemberPodo().getPodoType().getImageUrl()))
        .collect(Collectors.toList());

        List<PodosDto> podosList = new ArrayList<>();

        int size = podos.size();
        for (int i=0; i<size; i+= 26){
            int end = Math.min(size, i+26);
            List<PodoDto> podoDtoList1 = podoDtoList.subList(i, end);
            PodosDto podosDto = new PodosDto(podoDtoList1.size(), podoDtoList1);
            podosList.add(podosDto);
        }
        result.put("pageCnt", podosList.size());
        result.put("podosList", podosList);

        return result;
    }

    /** 포도알 조회 */
    @Override
    public PodoDetailDto detailPodo(String mid, int id) {
        // podo 조회
        Optional<Podo> podo = podoRepository.findById(id);
        Podo findPodo = podo.orElseThrow(() -> new IllegalStateException("포도알이 존재하지 않습니다."));

        // 날짜 변환 LocalDateTime to String
        String createdDate = findPodo.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // dto 생성 후 반환
        PodoDetailDto podoDetailDto = new PodoDetailDto(findPodo.getId(), findPodo.getOneline(), createdDate);
        return podoDetailDto;
    }

    /** 포도알 작성하기 */
    @Override
    public void create(String mid, PodoCreateDto podoCreateDto) {

        // small goal 확인
        SmallGoal findSmallGoal = checkSmallGoal(podoCreateDto.getId());
        // podoType 찾기
        PodoType podoType = podoTypeRepository.findByImageUrl(podoCreateDto.getImageUrl());
        log.info("podoType.getName= {}",podoType.getName());


        // MemberPodo 조회
        Optional<MemberPodo> memberPodo = memberPodoRepository.findByName(podoType.getId(), mid);
        MemberPodo findMemberPodo = memberPodo.orElseThrow(() -> new IllegalStateException("멤버 포도가 존재하지 않습니다."));

        // podo 생성 및 DB 저장
        Podo podo = Podo.builder()
                .oneline(podoCreateDto.getOneline())
                .createdAt(LocalDateTime.now())
                .memberPodo(findMemberPodo)
                .smallGoal(findSmallGoal)
                .build();
        podoRepository.save(podo);
    }


    /** 회원 스티커 종류
     * memberpodo 를 돌면서 status 가 false 이면 podoType의 imageLockUrl를 보내준다
     */
    //TODO: 스티커가 없다면 잠긴 스티커 나오게
    @Override
    public List<StickerDto> sticker(String mid) {

        // 멤버가 가진 포도 스티커 id 리스트
        List<MemberPodo> memberPodoList = memberPodoRepository.findByPodoTypeId(mid);

        // 내가 가진 포도 스티커의 상태를 비교하며 url 가져오기
        List<StickerDto> stickerList = new ArrayList<>();

        for (MemberPodo mp : memberPodoList){

            String imgUrl = (mp.isStatus()) ? mp.getPodoType().getImageUrl() : mp.getPodoType().getImageLockUrl();

            StickerDto stickerDto = new StickerDto(mp.getPodoType().getId(), imgUrl);
            stickerList.add(stickerDto);
        }
        return stickerList;
    }

    /** 포도알 설정 */
    @Override
    @Transactional
    public void podoSetting(String mid, int id) {
        // small goal 확인
        SmallGoal findSmallGoal = checkSmallGoal(id);
        // isSticker 변경
        if (findSmallGoal.isSticker()){
            findSmallGoal.setSticker(false);
        }else findSmallGoal.setSticker(true);
    }



    private SmallGoal checkSmallGoal(int id){
        Optional<SmallGoal> smallGoal = smallGoalRepository.findById(id);
        SmallGoal findSmallGoal = smallGoal.orElseThrow(() -> new IllegalStateException("세부 목표가 존재하지 않습니다."));
        return findSmallGoal;
    }
}
