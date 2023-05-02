package com.project.smg.redis;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

@SpringBootTest
@Slf4j
public class redisTest {
    @Autowired
    RedisTemplate redisTemplate;

    @Test
    void testStrings(){
        ValueOperations<String, Object> stringObjectValueOperations = redisTemplate.opsForValue();
        String key = "stringTest1";
        stringObjectValueOperations.set(key,"1");

        Object result = stringObjectValueOperations.get(key);
        log
    }
}
