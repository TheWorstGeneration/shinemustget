package com.project.smg.utils;

import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.LikeRepository;
import com.project.smg.mandalart.repository.TitleRepository;
import com.project.smg.mandalart.service.MandalartLikeService;
import com.project.smg.member.entity.Likes;
import com.project.smg.member.entity.Member;
import com.project.smg.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Iterator;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Log4j2
public class RedisSchedule {
    private final MandalartLikeService mandalartLikeService;
    private final LikeRepository likeRepository;
    private final TitleRepository titleRepository;
    private final MemberRepository memberRepository;
    private final RedisTemplate redisTemplate;

    @Transactional
    @Scheduled(cron = "0 0/1 * * * *")
    public void deleteLikeFromRedis(){
        log.info("[Scheduling] redis like caching start");

        Set<String> redisKeys = redisTemplate.keys("like*");
        Iterator<String> it = redisKeys.iterator();

        SetOperations<String, String> setOperations = redisTemplate.opsForSet();

        while (it.hasNext()) {

            String key = it.next();
            int mandalartId = Integer.parseInt(key.split("::")[1]);
            Set<String> members = setOperations.members(key);

           // List<Likes> status1List = likeRepository.findByStatus();
            for (String memberId : members){
                Likes likes = checkDB(mandalartId,memberId);

                // DB 에 없으면 like 생성 후 DB 저장
                if (likes == null){
                    Title title = mandalartLikeService.checkTitle(mandalartId);
                    Member member = checkMember(memberId);

                    Likes newLike = Likes.builder()
                            .title(title)
                            .status(true)
                            .member(member)
                            .build();
                    likeRepository.save(newLike);
                    log.info("Like DB Save");
                }else{
                // DB 있으면 redis 값 확인해서 변경
                    // memberId 가 redis 에 존재하면 status 1로 변경 아니면 0 변경
                    likes.setStatus(true);
                }

            }
            // 기존 redis caching 데이터 삭제
            //redisTemplate.delete(key);


        }


        // redis caching 데이터 DB 저장
    }


    private Member checkMember(String mid) {
        Optional<Member> member = memberRepository.findById(mid);
        Member findMember = member.orElseThrow(() -> new IllegalStateException("회원이 존재하지 않습니다."));
        return findMember;
    }
    private Likes checkDB(int id, String mid) {
        Optional<Likes> like = likeRepository.findByMemberAndMandalart(id,mid);
        Likes findLike = like.orElse(null);
        return findLike;
    }

}
