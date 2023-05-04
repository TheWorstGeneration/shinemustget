package com.project.smg.alarm.service;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.mandalart.entity.Title;

public interface AlarmService {
    AlarmDto saveAlarm(String memberId, Title title);
}
