package com.project.smg.alarm.service;

import com.project.smg.alarm.Handler.CustomWebSocketHandler;
import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.TitleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Slf4j
@Service
@RequiredArgsConstructor
public class sendServiceImpl implements sendService{
    private final CustomWebSocketHandler customWebSocketHandler;
    private final TitleRepository titleRepository;
    private final AlarmMakeService alarmMakeService;
    @Override
    public void sendAlarm(String memberId, int id) {
        Title title = titleRepository.findById(id).orElse(null);
        String opponentId = title.getMember().getId();

        WebSocketSession session = customWebSocketHandler.getUserSession(opponentId);
        AlarmDto alarmDto = alarmMakeService.saveAlarm(opponentId, id);
        TextMessage message = new TextMessage(alarmDto.getMessage() + " " + alarmDto.getCreatedAt());

    }

}
