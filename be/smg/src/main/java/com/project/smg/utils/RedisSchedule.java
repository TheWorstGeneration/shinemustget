package com.project.smg.utils;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.LikeRepository;
import com.project.smg.mandalart.service.MandalartLikeService;
import com.project.smg.mandalart.service.MandalartService;
import com.project.smg.member.entity.Likes;
import com.project.smg.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Log4j2
public class RedisSchedule {
    private final MandalartLikeService mandalartLikeService;
    private final LikeRepository likeRepository;
    private final RedisTemplate redisTemplate;
    private final MandalartService mandalartService;
    private final ChatUtils chatUtils;
    private final RedisTemplate<String, AlarmDto> alarmRedisTemplate;
    private ZSetOperations<String, AlarmDto> zSetOperations;

    @PostConstruct
    private void init() {
        zSetOperations = alarmRedisTemplate.opsForZSet();
    }

    @Transactional
    @Scheduled(cron = "0 0/3 * * * *")
    public void deleteChangeLikeFromRedis() {
        log.info("[Scheduling] redis like caching start");

        Set<String> redisChangeKeys = redisTemplate.keys("change*");

        if (redisChangeKeys == null) {
            return;
        }

        Iterator<String> changeKeys = redisChangeKeys.iterator();

        SetOperations<String, String> setOperations = redisTemplate.opsForSet();

        while (changeKeys.hasNext()) {

            String changeKey = changeKeys.next();
            int titleId = Integer.parseInt(changeKey.split("::")[1]);

            Set<String> membersChangeInRedis = setOperations.members(changeKey);

            for (String memberId : membersChangeInRedis) {
                Likes likes = mandalartLikeService.checkLike(memberId, titleId);

                // DB 에 없으면 like 생성 후 DB 저장
                if (likes == null) {
                    Title title = mandalartLikeService.checkTitle(titleId);
                    Member member = mandalartLikeService.checkMember(memberId);

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
                // 검색을 위한 title 테이블의 like_cnt update
                updateLikeCnt(titleId);
            }
            // 변경 redis caching 데이터 삭제
            log.info("[Scheduling] 좋아요 변경 redis caching 데이터 삭제 ");
            redisTemplate.delete(changeKey);

        }
        // Todo redis 삭제는 일주일에 한 번 -> 나중에 Scheduled 로 빼기
        // 기존 redis caching 데이터 삭제
        deleteLikeFromRedis();

    }

    @Scheduled(cron = "0 0 0 * * *")
    public void cleanupExpiredAlarms() {
        log.info("[Scheduling] 알람 데이터 삭제 시작");

        LocalDateTime expirationDateTime = LocalDateTime.now().minusHours(24);

        double expirationTimestamp = chatUtils.changeLocalDateTimeToDouble(expirationDateTime);

        // Redis에서 expirationTime보다 작은 스코어를 가지는 데이터 삭제
        Set<String> allKeys = alarmRedisTemplate.keys("*"); // 모든 키 가져오기
        for (String key : allKeys) {
            Set<AlarmDto> expiredAlarms = zSetOperations.rangeByScore(key, 0, expirationTimestamp);
            for (AlarmDto alarmDto : expiredAlarms) {
                zSetOperations.remove(key, alarmDto);
            }
        }
        log.info("[Scheduling] 알람 데이터 삭제 완료");
    }

    @Transactional
    public void updateLikeCnt(int titleId) {
        Title findTitle = mandalartLikeService.checkTitle(titleId);
        // 변경된 title id 만 db 개수 조회해서 update
        int likeCnt = likeRepository.countByTitleIdAndStatus(titleId, true).intValue();
        findTitle.setLikeCnt(likeCnt);
        mandalartService.saveClearTitle(findTitle);
    }

    private void deleteLikeFromRedis() {
        // 기존 redis caching 데이터 삭제
        log.info("[Scheduling] 좋아요 기존 redis caching 데이터 삭제 ");
        Set<String> redisLikeKeys = redisTemplate.keys("like*");
        if (redisLikeKeys == null) {
            return;
        }
        Iterator<String> likeKeys = redisLikeKeys.iterator();

        while (likeKeys.hasNext()) {
            String likeKey = likeKeys.next();
            redisTemplate.delete(likeKey);
        }
    }


}
