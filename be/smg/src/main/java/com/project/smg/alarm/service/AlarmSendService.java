package com.project.smg.alarm.service;

public interface AlarmSendService {
    void sendLikeAlarm(String nickname, int id) throws Exception;
    void sendPodoAlarm(String memberId) throws Exception;
}
