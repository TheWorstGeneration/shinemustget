package com.project.smg.utils;

import com.project.smg.mandalart.repository.LikeRepository;
import com.project.smg.mandalart.repository.TitleRepository;
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
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Log4j2
public class RedisSchedule {
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
            // db 에 저장을 할건데 어떻게 하지?
            int mandalartId = Integer.parseInt(key.split("::")[1]);
            Set<String> members = setOperations.members(key);

            List<Likes> status1List = likeRepository.findByStatus();
            for (String memberId : members){
                Likes likes = checkDB(mandalartId,memberId);
                // db 에 없으면 like 생성
                if (likes == null){

                }else{
                // db 있으면 redis 값 확인해서 변경

                }
                System.out.println(memberId);
            }
            // 기존 redis caching 데이터 삭제
            //redisTemplate.delete(key);


        }


        // redis caching 데이터 DB 저장
    }
    private Likes checkDB(int id, String mid) {
        Optional<Likes> like = likeRepository.findByMemberAndMandalart(id,mid);
        Likes findLike = like.orElse(null);
        return findLike;
    }

}
