package com.project.smg.utils;

import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.LikeRepository;
import com.project.smg.mandalart.service.MandalartLikeService;
import com.project.smg.member.entity.Likes;
import com.project.smg.member.entity.Member;
import com.project.smg.member.repository.MemberRepository;
import com.sun.xml.bind.v2.TODO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;

@Service
@RequiredArgsConstructor
@Log4j2
public class RedisSchedule {
    private final MandalartLikeService mandalartLikeService;
    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;
    private final RedisTemplate redisTemplate;
    // TODO DB 데이터 동기화 할 때 like Cnt 추가
    @Transactional
    @Scheduled(cron = "0 0/3 * * * *")
    public void deleteChangeLikeFromRedis() {
        log.info("[Scheduling] redis like caching start");

        Set<String> redisChangeKeys = redisTemplate.keys("change*");
        Iterator<String> changeKeys = redisChangeKeys.iterator();

        SetOperations<String, String> setOperations = redisTemplate.opsForSet();

        while (changeKeys.hasNext()) {

            String changeKey = changeKeys.next();
            int titleId = Integer.parseInt(changeKey.split("::")[1]);

            Set<String> membersChangeInRedis = setOperations.members(changeKey);

            for (String memberId : membersChangeInRedis) {
                Likes likes = checkDB(titleId, memberId);

                // DB 에 없으면 like 생성 후 DB 저장
                if (likes == null) {
                    Title title = mandalartLikeService.checkTitle(titleId);
                    Member member = checkMember(memberId);

                    Likes newLike = Likes.builder()
                            .title(title)
                            .status(true)
                            .member(member)
                            .build();
                    likeRepository.save(newLike);
                    log.info("Like DB Save");
                } else {    // DB 있으면
                    // status 1로 변경 아니면 0 변경
                    likes.setStatus(!likes.isStatus());
                }
            }
            // 변경 redis caching 데이터 삭제
            log.info("[Scheduling] 좋아요 변경 redis caching 데이터 삭제 ");
            redisTemplate.delete(changeKey);

        }
        // TODO redis 삭제는 일주일에 한 번 -> 나중에 Scheduled 로 빼기
        // 기존 redis caching 데이터 삭제
        deleteLikeFromRedis();
        // like_cnt update
        updateLikeCnt();
    }

    private void updateLikeCnt() {

    }


    private void deleteLikeFromRedis() {
        // 기존 redis caching 데이터 삭제
        log.info("[Scheduling] 좋아요 기존 redis caching 데이터 삭제 ");
        Set<String> redisLikeKeys = redisTemplate.keys("like*");
        Iterator<String> likeKeys = redisLikeKeys.iterator();

        while (likeKeys.hasNext()) {
            String likeKey = likeKeys.next();
            redisTemplate.delete(likeKey);
        }

    }

    private Member checkMember(String mid) {
        Optional<Member> member = memberRepository.findById(mid);
        Member findMember = member.orElseThrow(() -> new IllegalStateException("회원이 존재하지 않습니다."));
        return findMember;
    }

    private Likes checkDB(int id, String mid) {
        Optional<Likes> like = likeRepository.findByMemberAndMandalart(id, mid);
        Likes findLike = like.orElse(null);
        return findLike;
    }

}
