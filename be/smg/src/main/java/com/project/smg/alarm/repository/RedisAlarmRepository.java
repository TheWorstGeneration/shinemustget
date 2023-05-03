package com.project.smg.alarm.repository;

import com.project.smg.alarm.dto.AlarmDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RedisAlarmRepository implements AlarmRepository {
    private static final String KEY_PREFIX = "alarm:";
    private static final String SEQ_KEY = "alarm-sequence";
    private final RedisTemplate<String, AlarmDto> redisTemplate;
    private final RedisSequenceGenerator redisSequenceGenerator;

    @Override
    public void save(AlarmDto alarmDto) {
        String key = KEY_PREFIX + alarmDto.getMemberId() + ":" + alarmDto.getId();
        redisTemplate.opsForValue().set(key, alarmDto);

        Long id = redisSequenceGenerator.getNext(SEQ_KEY);
        alarmDto.setId(id.intValue());
    }
}
