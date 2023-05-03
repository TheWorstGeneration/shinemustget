package com.project.smg.alarm.repository;

public interface RedisSequenceGenerator {
    Long getNext(String key);
}
