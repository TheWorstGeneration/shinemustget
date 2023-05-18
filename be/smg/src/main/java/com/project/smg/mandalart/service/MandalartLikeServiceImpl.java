package com.project.smg.mandalart.service;

import com.project.smg.alarm.service.AlarmSendService;
import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.LikeRepository;
import com.project.smg.mandalart.repository.TitleRepository;
import com.project.smg.member.entity.Likes;
import com.project.smg.member.entity.Member;
import com.project.smg.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MandalartLikeServiceImpl implements MandalartLikeService {
    private final TitleRepository titleRepository;
    private final LikeRepository likeRepository;
    private final RedisTemplate redisTemplate;
    private final MemberRepository memberRepository;
    private final AlarmSendService alarmSendService;

    /**
     * 좋아요
     * 1) redis 조회
     * o -> memberId 있다면 제거, 없다면 추가
     * x -> db 조회 후 없으면 레디스 새로 저장, 있으면 db 값 redis 저장
     */
    @Override
    @Transactional
    public void mandalartLike(String mid, int id) throws Exception {
        // Title 확인
        Title findTitle = checkTitle(id);
        String key = "like::" + id;
        String subKey = "change::" + id;
        // redis set 으로 사용
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        // redis 조회

        // redis 에 값이 없는 경우
        saveRedisLike(id, key, setOperations);

        if (setOperations.isMember(key, mid)) { // 좋아요 취소
            if (setOperations.isMember(subKey, mid)) {
                setOperations.add(key, mid);
                log.info("좋아요 유지");
            } else {
                log.info("Redis에 좋아요 삭제");
                setOperations.remove(key, mid);
            }// 변경여부체크
            checkChange(mid, subKey, setOperations);

        } else { // 좋아요
            log.info("Redis에 좋아요 추가");
            setOperations.add(key, mid);
            // 변경여부체크
            checkChange(mid, subKey, setOperations);

            // 좋아요 시 상대방에게 알람 전송
            if (!mid.equals(findTitle.getMember().getId()))
                alarmSendService.sendLikeAlarm(checkMember(mid).getNickname(), id);
        }
    }


    /**
     * 만다라트 좋아요 여부  ( int id  => title id)
     * redis 조회 없으면 db 조회 후 redis 저장
     */
    @Override
    public boolean isMandalartLike(String mid, int id) {
        Title findTitle = checkTitle(id);
        String key = "like::" + id;
        boolean isLike = false;
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        // redis 에 값이 없는 경우
        saveRedisLike(id, key, setOperations);
        // redis 조회
        if (setOperations.isMember(key, mid)) { // 좋아요 여부 확인
            isLike = true;
        }
        return isLike;
    }

    /**
     * 만다라트 좋아요 숫자  ( int id  => title id)
     */
    @Override
    public int mandalartLikeCnt(int id) {
        // redis 조회해서 없으면 db 조회 하고 없으면 0 redis 다시 저장
        Title findTitle = checkTitle(id);
        String key = "like::" + id;
        int likeCnt = 0;
        SetOperations<String, String> setOperations = redisTemplate.opsForSet();
        // redis 에 값이 없는 경우
        saveRedisLike(id, key, setOperations);
        Long setSize = setOperations.size(key);
        likeCnt = setSize != null ? setSize.intValue() : 0;

        return likeCnt;
    }

    public void checkChange(String mid, String subKey, SetOperations<String, String> setOperations) {
        if (setOperations.isMember(subKey, mid)) {
            // 변경한적있냐
            setOperations.remove(subKey, mid);
        } else {
            // 처음 변경
            setOperations.add(subKey, mid);
        }
    }

    @Override
    public Likes checkLike(String mid, int id) {
        Likes like = likeRepository.findByMemberAndMandalart(id, mid).orElse(null);
        return like;
    }

    @Override
    public Title checkTitle(int id) {
        Title title = titleRepository.findById(id).orElseThrow(() -> new IllegalStateException("만다라트가 존재하지 않습니다."));
        return title;
    }

    @Override
    public Member checkMember(String mid) {
        Member findMember = memberRepository.findById(mid).orElseThrow(() -> new IllegalStateException("회원이 존재하지 않습니다."));
        return findMember;
    }

    public void saveRedisLike(int id, String key, SetOperations<String, String> setOperations) {
        if (!redisTemplate.hasKey(key)) {
            // 전체 DB 가져오기 (스케쥴링 삭제)
            // 만다라트 id 인 리스트를 다 가져와서 redis like 에 저장
            List<Likes> likeListByTitleId = likeRepository.findByTitleIdAndStatus(id, true);

            for (Likes like : likeListByTitleId) {
                setOperations.add(key, like.getMember().getId());
            }
        }
    }


}
