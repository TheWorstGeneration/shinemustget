package com.project.smg.alarm.Handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.smg.alarm.dto.ReceiveDto;
import com.project.smg.alarm.dto.SendAlarmDto;
import com.project.smg.alarm.service.AlarmMakeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class CustomWebSocketHandler extends TextWebSocketHandler {
    private final Map<String, WebSocketSession> userSessions = new HashMap<>();
    private final AlarmMakeService alarmMakeService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void addSession(String memberId, WebSocketSession session) {
        if (!userSessions.containsKey(memberId)) {
            userSessions.put(memberId, session);
        }
    }

    public WebSocketSession getUserSession(String memberId) {
        return userSessions.get(memberId);
    }

    public void removeSession(String memberId) {
        if (userSessions.containsKey(memberId)) {
            userSessions.remove(memberId);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String memberId = (String) session.getAttributes().get("id");
        log.info("소켓 연결");

        addSession(memberId, session);
        log.info("연결한 유저 {}", memberId);

        Map<String, Object> result = alarmMakeService.alarmDtoList(memberId, 0.0);

        session.sendMessage(new TextMessage(sendAlarmList(result, session)));

        log.info("메세지 조회 성공");
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String jsonPayload = message.getPayload().toString();
        ReceiveDto receivedMessage = objectMapper.readValue(jsonPayload, ReceiveDto.class);

        Map<String, Object> result = alarmMakeService.alarmDtoList(receivedMessage.getMemberId(), Double.parseDouble(receivedMessage.getCursor()));

        session.sendMessage(new TextMessage(sendAlarmList(result, session)));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String memberId = (String) session.getAttributes().get("id");
        removeSession(memberId);
        log.info("유저 로그아웃 {}", memberId);
        log.info("소켓 연결 종료 {}", status);
        session.close();
    }

    public void sendMessageToUser(String memberId, SendAlarmDto sendAlarmDto) throws Exception {
        WebSocketSession session = userSessions.get(memberId);
        if (session != null && session.isOpen()) {
//            TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(alarmDto));
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(sendAlarmDto)));
//            try {
//                session.sendMessage(textMessage);
//            } catch (IOException e) {
//                // 메시지 전송 중 오류 처리
//                log.error("메세지 전송 실패 : {}", memberId, e);
//            }
        } else {
            log.warn("수신자의 세션이 닫혀있거나 존재하지 않음 : {}", memberId);
        }
    }

    private String sendAlarmList(Map<String, Object> result, WebSocketSession session) throws Exception {
        List<SendAlarmDto> alarmDtoList = (List<SendAlarmDto>) result.get("sendAlarmDtoList");
        double nextScore = (double) result.get("nextScore");

        log.info("메세지 조회 {}", alarmDtoList.size());

        for (int i = 0; i < alarmDtoList.size(); i++) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(alarmDtoList.get(i))));
        }

        Map<String, Object> data = new HashMap<>();
        data.put("cursor", Double.toString(nextScore));

        return objectMapper.writeValueAsString(data);
    }
}
