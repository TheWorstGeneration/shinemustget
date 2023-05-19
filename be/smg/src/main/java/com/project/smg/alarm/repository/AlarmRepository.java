package com.project.smg.alarm.repository;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.dto.LatestAlarmsResultDto;

import java.util.List;
import java.util.Map;

public interface AlarmRepository {
    void save(AlarmDto alarmDto);
    LatestAlarmsResultDto getLatestAlarms(String memberId, double lastScore);
}
