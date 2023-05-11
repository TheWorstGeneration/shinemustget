package com.project.smg.alarm.repository;

import com.project.smg.alarm.dto.AlarmDto;

import java.util.List;
import java.util.Map;

public interface AlarmRepository {
    void save(AlarmDto alarmDto);
    Map<String, Object> getLatestAlarms(String memberId, double lastScore);
}
