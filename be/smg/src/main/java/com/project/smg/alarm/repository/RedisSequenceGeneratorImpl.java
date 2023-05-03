package com.project.smg.alarm.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisSequenceGeneratorImpl implements RedisSequenceGenerator {
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public Long getNext(String key) {
        return redisTemplate.opsForValue().increment(key);
    }
}
