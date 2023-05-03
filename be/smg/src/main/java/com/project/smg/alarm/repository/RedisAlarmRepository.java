package com.project.smg.alarm.repository;

import com.project.smg.alarm.dto.AlarmDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RedisAlarmRepository implements AlarmRepository {
    private final RedisTemplate<String, AlarmDto> redisTemplate;
    private final RedisSequenceGenerator redisSequenceGenerator;

    @Override
    public void save(AlarmDto alarmDto) {
        String keyPrefix = alarmDto.getMemberId() + ":";
        String postIdKey = keyPrefix + "post-sequence";

        // Redis 서버의 postId 값을 가져와서 AlarmDto 객체의 id 값으로 설정
        Long postId = redisSequenceGenerator.getNext(postIdKey);
        String key = keyPrefix + postId;
        alarmDto.setId(postId.intValue());

        redisTemplate.opsForValue().set(key, alarmDto);
    }
}
