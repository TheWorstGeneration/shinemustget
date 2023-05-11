package com.project.smg.alarm.service;

import com.project.smg.alarm.Handler.CustomWebSocketHandler;
import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.dto.SendAlarmDto;
import com.project.smg.alarm.repository.RedisAlarmRepository;
import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.TitleRepository;
import com.project.smg.mandalart.service.MandalartLikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {
    private final RedisAlarmRepository redisAlarmRepository;
    private final TitleRepository titleRepository;
    private final CustomWebSocketHandler customWebSocketHandler;

    @Override
    public AlarmDto saveAlarm(String memberId, int id) {
        Title title = titleRepository.findById(id).orElse(null);

        String message = "다른 사용자가 " + title.getContent() + " 만다라트에 좋아요 표시를 했습니다.";
        AlarmDto alarmDto = AlarmDto.builder()
                .memberId(memberId)
                .titleName(title.getContent())
                .titleId(title.getId())
                .message(message)
                .createdAt(LocalDateTime.now())
                .build();

        redisAlarmRepository.save(alarmDto);

        return alarmDto;
    }

    @Override
    public List<SendAlarmDto> alarmDtoList(String memberId) {
        return redisAlarmRepository.getRecentAlarmsWithCursor(memberId, 10)
                .stream()
                .map(alarmDto -> new SendAlarmDto(alarmDto.getMessage(), alarmDto.getCreatedAt()))
                .collect(Collectors.toList());
    }

    @Override
    public void sendLikeNotification(String memberId) {
        List<WebSocketSession> sessions = customWebSocketHandler.getUserSessions(memberId);
        if (sessions != null && !sessions.isEmpty()) {
            for (WebSocketSession session : sessions) {
                try {
                    session.sendMessage(new TextMessage("다른 사용자가 만다라트에 좋아요 표시를 했습니다."));
                } catch (IOException e) {
                    log.error("Failed to send like notification to session: {}", session.getId(), e);
                }
            }
        }
    }
}
