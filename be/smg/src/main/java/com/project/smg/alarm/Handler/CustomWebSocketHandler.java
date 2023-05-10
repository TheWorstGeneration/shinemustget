package com.project.smg.alarm.Handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class CustomWebSocketHandler extends TextWebSocketHandler {
    private final Map<String, List<WebSocketSession>> userSessions = new HashMap<>();

    public void addSession(String memberId, WebSocketSession session) {
        userSessions.computeIfAbsent(memberId, k -> new ArrayList<>()).add(session);
    }

    public List<WebSocketSession> getUserSessions(String memberId) {
        return userSessions.getOrDefault(memberId, new ArrayList<>());
    }

    public void removeSession(String memberId, WebSocketSession session) {
        List<WebSocketSession> sessions = getUserSessions(memberId);
        sessions.remove(session);
        if (sessions.isEmpty()) {
            userSessions.remove(memberId);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String memberId = (String) session.getAttributes().get("memberId");
        log.info("소켓 연결");

        addSession(memberId, session);
        log.info("연결한 유저 {}", memberId);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        super.handleMessage(session, message);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String memberId = (String) session.getAttributes().get("memberId");
        removeSession(memberId, session);
        log.info("소켓 연결 종료");
    }

}
