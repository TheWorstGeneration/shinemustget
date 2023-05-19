package com.project.smg.alarm.Handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.smg.alarm.dto.LatestAlarmsResultDto;
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
        userSessions.computeIfAbsent(memberId, key -> session);
    }

    public String getMemberId(WebSocketSession session) {
        return (String) session.getAttributes().get("id");
    }

    public void removeSession(String memberId) {
        if (userSessions.containsKey(memberId)) {
            userSessions.remove(memberId);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String memberId = getMemberId(session);
        log.info("소켓 연결");

        addSession(memberId, session);
        log.info("연결한 유저 {}", memberId);

        session.sendMessage(new TextMessage(sendAlarmList(alarmMakeService.alarmDtoList(memberId, 0.0), session)));

        log.info("메세지 조회 성공");
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String jsonPayload = message.getPayload().toString();
        ReceiveDto receivedMessage = objectMapper.readValue(jsonPayload, ReceiveDto.class);
        log.info("메세지 수신 시작");

        String memberId = getMemberId(session);

        if (receivedMessage.getCursor() != null) {
            log.info("알람 전송");
            session.sendMessage(new TextMessage(sendAlarmList(alarmMakeService.alarmDtoList(memberId, Double.parseDouble(receivedMessage.getCursor())), session)));
        }

        if (receivedMessage.getDeleteStart() != null && receivedMessage.getDeleteEnd() != null) {
            log.info("알람 삭제 시도");
            boolean deleteResult = alarmMakeService.deleteAlarm(memberId, Double.parseDouble(receivedMessage.getDeleteStart()), Double.parseDouble(receivedMessage.getDeleteEnd()));
            if (deleteResult) {
                log.info("알람 삭제 성공");
            } else {
                log.info("알람 삭제 실패");
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String memberId = getMemberId(session);
        removeSession(memberId);
        log.info("유저 로그아웃 {}", memberId);
        log.info("소켓 연결 종료 {}", status);
        session.close();
    }

    /**
     * 이벤트 발생 시 알람 전송
     *
     * @param memberId
     * @param sendAlarmDto
     * @throws Exception
     */
    public void sendMessageToUser(String memberId, SendAlarmDto sendAlarmDto) throws Exception {
        WebSocketSession session = userSessions.get(memberId);
        if (session != null && session.isOpen()) {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(sendAlarmDto)));
        } else {
            log.warn("수신자의 세션이 닫혀있거나 존재하지 않음 : {}", memberId);
        }
    }

    /**
     * 알람 목록 전송
     *
     * @param latestAlarmsResultDto
     * @param session
     * @return
     * @throws Exception
     */
    private String sendAlarmList(LatestAlarmsResultDto latestAlarmsResultDto, WebSocketSession session) throws Exception {
        List<SendAlarmDto> alarmDtoList = latestAlarmsResultDto.getAlarms();
        double nextScore = latestAlarmsResultDto.getLastScore();

        log.info("메세지 갯수 조회 {}", alarmDtoList.size());

        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(alarmDtoList)));

        Map<String, Object> data = new HashMap<>();
        data.put("cursor", Double.toString(nextScore));

        return objectMapper.writeValueAsString(data);
    }
}
