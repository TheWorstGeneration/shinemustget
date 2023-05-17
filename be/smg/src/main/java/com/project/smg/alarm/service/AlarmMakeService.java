package com.project.smg.alarm.service;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.dto.LatestAlarmsResultDto;
import com.project.smg.alarm.dto.SendAlarmDto;
import com.project.smg.mandalart.entity.Title;

import java.util.List;
import java.util.Map;

public interface AlarmMakeService {
    AlarmDto saveLikeAlarm(String memberId, int id, String nickname);
    AlarmDto savePodoAlarm(String memberId);
    LatestAlarmsResultDto alarmDtoList(String memberId, double lastSocre);
    boolean deleteAlarm(String memberId, double deleteStart, double deleteEnd);
}
