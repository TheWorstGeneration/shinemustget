package com.project.smg.alarm.repository;

import com.project.smg.alarm.dto.AlarmDto;

public interface AlarmRepository {
    void save(AlarmDto alarmDto);
}
