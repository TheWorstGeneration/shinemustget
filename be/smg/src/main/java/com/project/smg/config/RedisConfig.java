package com.project.smg.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.project.smg.alarm.dto.AlarmDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {
    @Value("${spring.redis.port}")
    public int port;

    @Value("${spring.redis.host}")
    public String host;

    @Value("${spring.redis.password}")
    public String password;

    @Bean
    public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<?, ?> redisTemplate = new RedisTemplate<>();
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer(objectMapper));
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        return redisTemplate;
    }

    @Bean
    public RedisTemplate<String, AlarmDto> alarmRedisTemplate(RedisConnectionFactory redisConnectionFactory, ObjectMapper objectMapper) {
        RedisTemplate<String, AlarmDto> alarmRedisTemplate = new RedisTemplate<>();
        alarmRedisTemplate.setConnectionFactory(redisConnectionFactory);

        // Key Serializer 설정
        alarmRedisTemplate.setKeySerializer(new StringRedisSerializer());

        // Value Serializer 설정
        Jackson2JsonRedisSerializer<AlarmDto> serializer = new Jackson2JsonRedisSerializer<>(AlarmDto.class);
        serializer.setObjectMapper(objectMapper); // ObjectMapper를 설정해 줍니다.
        alarmRedisTemplate.setValueSerializer(serializer);
        alarmRedisTemplate.setHashKeySerializer(new StringRedisSerializer());
        alarmRedisTemplate.setHashValueSerializer(serializer);

        return alarmRedisTemplate;
    }



    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
        redisStandaloneConfiguration.setHostName(host);
        redisStandaloneConfiguration.setPort(port);
        redisStandaloneConfiguration.setPassword(password);
        return new LettuceConnectionFactory(redisStandaloneConfiguration);
    }
}
