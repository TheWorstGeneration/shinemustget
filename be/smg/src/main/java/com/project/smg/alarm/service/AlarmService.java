package com.project.smg.alarm.service;

import com.project.smg.alarm.dto.AlarmDto;

public interface AlarmService {
    AlarmDto saveAlarm(String memberId, String titleName);
}
