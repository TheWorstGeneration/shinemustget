package com.project.smg.alarm.repository;

import com.project.smg.alarm.dto.AlarmDto;

import java.util.List;

public interface AlarmRepository {
    void save(AlarmDto alarmDto);
    List<AlarmDto> getRecentAlarmsWithCursor(String memberId, int limit);
}
