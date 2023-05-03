package com.project.smg.redis;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;

import java.util.Arrays;
import java.util.Set;

@SpringBootTest
@Slf4j
public class redisTest {
    @Autowired
    RedisTemplate redisTemplate;

    @Test
    void testInteger(){
        final ValueOperations<String, Integer> stringObjectValueOperations = redisTemplate.opsForValue();
        String key = "stringTest1";

        stringObjectValueOperations.set(key,1);
        stringObjectValueOperations.increment(key);

        Object result = stringObjectValueOperations.get(key);
        log.info("result= {}", result);

    }

    @Test
    void testSet(){
        SetOperations <String, String> stringStringSetOperations = redisTemplate.opsForSet();
        String key = "stringTest2";

        stringStringSetOperations.add(key, "12345");
        stringStringSetOperations.add(key, "123456");
        stringStringSetOperations.add(key, "12345");

        Set<String> strings = stringStringSetOperations.members(key);
        System.out.println("members = " + Arrays.toString(strings.toArray()));
        System.out.println("members = " + strings);
        System.out.println("size = " + stringStringSetOperations.size(key));

    }
}
