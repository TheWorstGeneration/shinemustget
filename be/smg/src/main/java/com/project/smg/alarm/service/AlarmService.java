package com.project.smg.alarm.service;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.dto.SendAlarmDto;
import com.project.smg.mandalart.entity.Title;

import java.util.List;

public interface AlarmService {
    AlarmDto saveAlarm(String memberId, int id);
    List<SendAlarmDto> alarmDtoList(String memberId);
    void sendLikeNotification(String memberId);
}
