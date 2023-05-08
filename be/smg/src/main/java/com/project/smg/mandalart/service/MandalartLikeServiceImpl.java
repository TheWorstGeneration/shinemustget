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

import java.util.List;
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
        String subKey = "change::"+id;
        // redis set 으로 사용
        SetOperations <String, String> setOperations = redisTemplate.opsForSet();
        // redis 조회
        // redis 에 값이 없는 경우
        if(!redisTemplate.hasKey(key)){

            // 전체 DB 가져오기 (스케쥴링 삭제)
            // 만다라트 id 인 리스트를 다 가져와서 redis 에 저장
            List<Likes> likeListByTitleId = likeRepository.findByTitleIdAndStatus(id, true);

            for (Likes like : likeListByTitleId){
                setOperations.add(key, like.getMember().getId());
            }
        }
        if (setOperations.isMember(key, mid)){ // 좋아요 취소
            log.info("exist redis, like remove from Redis");
            setOperations.remove(key, mid);
            // 변경여부체크
            checkChange(mid, subKey, setOperations);

        }else{ // 좋아요
            log.info("exist redis, like add from Redis");
            setOperations.add(key,mid);
            // 변경여부체크
            checkChange(mid, subKey, setOperations);
        }







    }

    private  void checkChange(String mid, String subKey, SetOperations<String, String> setOperations) {
        if (setOperations.isMember(subKey, mid)) {
            // 변경한적있냐
            setOperations.remove(subKey, mid);
        }else{
            // 처음 변경
            setOperations.add(subKey, mid);
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
