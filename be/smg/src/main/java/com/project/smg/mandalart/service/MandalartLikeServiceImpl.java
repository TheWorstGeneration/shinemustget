package com.project.smg.mandalart.service;

import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.LikeRepository;
import com.project.smg.mandalart.repository.TitleRepository;
import com.project.smg.member.entity.Likes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Slf4j
@Service
@RequiredArgsConstructor
public class MandalartLikeServiceImpl implements MandalartLikeService{
    private final TitleRepository titleRepository;
    private final LikeRepository likeRepository;
    private final RedisTemplate redisTemplate;
    /**
     * 좋아요
     * 1) redis 조회
     *     o -> memberId 있다면 제거, 없다면 추가
     *     x -> db 조회 후 없으면 레디스 새로 저장, 있으면 db 값 redis 저장
     * */
    @Override
    @Transactional
    public void mandalartLike(String mid, int id) {
        // Title 확인
        Title findTitle = checkTitle(id);

        String key = "like::"+id;
        // redis set 으로 사용
        SetOperations <String, String> setOperations = redisTemplate.opsForSet();
        // redis 조회
        // redis 에 값이 없는 경우
        if(!redisTemplate.hasKey(key)){
            // DB 조회
            Likes findLike = checkLike(mid, id);
            // DB 없음 -> redis 새로 저장
            if (findLike==null){
                log.info("no DB, new key add from Redis");
                setOperations.add(key, mid);
            } else {
                // DB 있음 -> DB status 변경 하고 redis 에 저장
                if (findLike.isStatus()){
                    log.info("exist DB, status update False from DB");
                    findLike.setStatus(false);
                }else {
                    log.info("exist DB, status update True from DB, like add from Redis");
                    findLike.setStatus(true);
                    setOperations.add(key,mid);
                }
            }
        // redis 에 값이 있는 경우
        // mid 있는 경우 -> redis value 제거
        // mid 없는 경우 -> redis value 추가
        }else{
            if (setOperations.isMember(key, mid)){
                log.info("exist redis, like remove from Redis");
                setOperations.remove(key, mid);
            }else{
                log.info("exist redis, like add from Redis");
                setOperations.add(key,mid);
            }




        }


    }

    public Likes checkLike(String mid, int id) {
        Optional<Likes> like = likeRepository.findByMemberAndMandalart(id, mid);
        Likes findLike = like.orElse(null);
        return findLike;
    }
    @Override
    public Title checkTitle(int id) {
        Optional<Title> title = titleRepository.findById(id);
        Title findTitle = title.orElseThrow(() -> new IllegalStateException("만다라트가 존재하지 않습니다."));
        return findTitle;
    }


}
