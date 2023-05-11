package com.project.smg.alarm.service;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.dto.SendAlarmDto;
import com.project.smg.mandalart.entity.Title;

import java.util.List;
import java.util.Map;

public interface AlarmService {
    AlarmDto saveAlarm(String memberId, int id);
    Map<String, Object> alarmDtoList(String memberId, double lastSocre);
}
