package com.project.smg.alarm.controller;

import com.project.smg.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.socket.WebSocketSession;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebSocketController {
    private final AlarmService alarmService;

    @MessageMapping("/like")
    public void handleLikeRequest(WebSocketSession session, @PathVariable("id") int id) {
        String memberId = (String) session.getAttributes().get("memberId");
        alarmService.saveAlarm(memberId, id);
    }
}
