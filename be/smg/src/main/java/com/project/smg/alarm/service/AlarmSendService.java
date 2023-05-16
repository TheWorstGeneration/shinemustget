package com.project.smg.alarm.service;

public interface AlarmSendService {
    void sendAlarm(String nickname, int id) throws Exception;
}
