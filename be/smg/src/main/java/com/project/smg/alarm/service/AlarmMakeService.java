package com.project.smg.alarm.service;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.dto.LatestAlarmsResultDto;
import com.project.smg.alarm.dto.SendAlarmDto;
import com.project.smg.mandalart.entity.Title;

import java.util.List;
import java.util.Map;

public interface AlarmMakeService {
    AlarmDto saveAlarm(String memberId, int id, String nickname);
//    Map<String, Object> alarmDtoList(String memberId, double lastSocre);
    LatestAlarmsResultDto alarmDtoList(String memberId, double lastSocre);
    boolean deleteAlarm(String memberId, double deleteStart, double deleteEnd);
}
