package com.project.smg.podo.service;


import com.project.smg.mandalart.entity.SmallGoal;
import com.project.smg.mandalart.repository.SmallGoalRepository;
import com.project.smg.mandalart.service.MandalartLikeService;
import com.project.smg.member.entity.Member;
import com.project.smg.member.entity.MemberPodo;
import com.project.smg.member.repository.MemberPodoRepository;
import com.project.smg.podo.dto.*;
import com.project.smg.podo.repository.PodoRepository;
import com.project.smg.podo.repository.PodoTypeRepository;
import com.project.smg.podo.entity.Podo;
import com.project.smg.podo.entity.PodoType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PodoServiceImpl implements PodoService {
    private final SmallGoalRepository smallGoalRepository;
    private final MemberPodoRepository memberPodoRepository;
    private final PodoTypeRepository podoTypeRepository;
    private final PodoRepository podoRepository;
    private final MandalartLikeService mandalartLikeService;

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

    // TODO is26daysClear - special podo 여부 : true 면 알림호출
    /** 포도알 작성하기 */
    @Override
    @Transactional
    public void create(String mid, PodoCreateDto podoCreateDto) {

        // small goal 확인
        SmallGoal findSmallGoal = checkSmallGoal(podoCreateDto.getId());
        // podoType 찾기
        PodoType podoType = podoTypeRepository.findByImageUrl(podoCreateDto.getImageUrl());
        log.info("podoType.getName= {}",podoType.getName());


        // MemberPodo 조회
        MemberPodo findMemberPodo = checkMemberPodo(mid, podoType);

        // podo 생성 및 DB 저장
        Podo podo = Podo.builder()
                .oneline(podoCreateDto.getOneline())
                .createdAt(LocalDateTime.now())
                .memberPodo(findMemberPodo)
                .smallGoal(findSmallGoal)
                .build();
        podoRepository.save(podo);

        // 스페셜 포도 알림 여부
        boolean is26daysClear = isSpecialClear(mid, podoCreateDto.getId());
        log.info("is26daysClear= {}",is26daysClear);
    }


    /** 스페셜 포도 여부
     * 스페셜 포도를 소유하고 있지 않다면 (memberpodo 의 podoType 4로 확인)
     * smallgoal_id 랑 memberId 가 같고 created_at 이 오늘까지 연속 26일때
     * 스페셜 포도 부여 (memberpodo podotype 4~6 까지 1로 변경)
     * */
    @Transactional
    public boolean isSpecialClear(String mid, int id){
        boolean isSpecial = memberPodoRepository.isfindByPodoTypeId(4, mid);
        if (!isSpecial){
            // 현재 날짜 받아서 date 25일 전이 뺀거랑 같으면 true
            LocalDate nowMinus25days = LocalDateTime.now().minusDays(25).toLocalDate();
            log.info("nowMinus25days= {}",nowMinus25days);
            List<Podo> bySmallGoalId = podoRepository.findBySmallGoalIdDesc(id);
            log.info("연속 포도 달성날짜 = {}일",bySmallGoalId.size());
            if (bySmallGoalId.size() >=26 ){
                LocalDate createdAt = bySmallGoalId.get(25).getCreatedAt().toLocalDate();
                log.info("createdAt= {}",createdAt);
                if (nowMinus25days.equals(createdAt)){

                    log.info("스페셜 포도 축하합니다 ^^ !! ");
                    setSpecialMemberPodo(mid);
                    setSpecialDate(mid);
                    return true;
                }
            }
        }
        log.info("스페셜 포도 아닙니다 ..");
        return false;
    }
    @Transactional
    private void setSpecialDate(String mid) {
        Member findMember = mandalartLikeService.checkMember(mid);
        findMember.setSpecialStickerDate(LocalDateTime.now());
    }

    @Transactional
    void setSpecialMemberPodo(String mid){
        List<MemberPodo> byPodoTypeStatus0 = memberPodoRepository.findByPodoTypeStatus0(mid);
        log.info("스페셜 포도 부여합니다 ^^ !!");
        for (MemberPodo mp : byPodoTypeStatus0){
            mp.setStatus(true);
        }
    }

    // TODO checkSpecialStickerTime - special podo 사용가능시간 - > 로그인 성공할때마다 확인
    /** 스페셜 포도 지속시간 확인 - 로그인 시 확인
     * member 의 specialStickerDate 가  null 이 아니면 (스페셜 포도가 있으면)
     *      현재 날짜를 받아서 한달 minus 해주고 그 specialStickerDate와 비교
     *      다시 null
     * */

    @Override
    @Transactional
    public void checkSpecialStickerTime(Member member) {
        if (member.getSpecialStickerDate() != null){
            log.info("스페셜 포도 검사 들어갑니다.");
            LocalDate nowMinus1Month = LocalDateTime.now().minusMonths(1).toLocalDate();
            LocalDate memberDate = member.getSpecialStickerDate().toLocalDate();
            if (nowMinus1Month.isAfter(memberDate)){
                member.setSpecialStickerDate(null);
                log.info("스페셜 포도 권한이 사라졌습니다");
            }else {
                log.info("아직 더 쓸 수 있어요 ");
            }
        }else {
            log.info("스페셜 포도 검사 대상자 아닙니다.");
        }
    }

    /** 회원 스티커 종류
     * memberpodo 를 돌면서 status 가 false 이면 podoType의 imageLockUrl를 보내준다
     */
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
        findSmallGoal.setSticker(!findSmallGoal.isSticker());
    }
    /** 포도알 설정 조회*/
    @Override
    public boolean podoSettingRead(String mid, int id) {
        SmallGoal findSmallGoal = checkSmallGoal(id);
        return findSmallGoal.isSticker();
    }

    private SmallGoal checkSmallGoal(int id){
        SmallGoal smallGoal = smallGoalRepository.findById(id).orElseThrow(() -> new IllegalStateException("세부 목표가 존재하지 않습니다."));
        return smallGoal;
    }

    // podoType id 로 memberpodo 찾기
    private MemberPodo checkMemberPodo(String mid, PodoType podoType) {
        MemberPodo memberPodo = memberPodoRepository.findByName(podoType.getId(), mid).orElseThrow(() -> new IllegalStateException("멤버 포도가 존재하지 않습니다."));
        return memberPodo;
    }
}
