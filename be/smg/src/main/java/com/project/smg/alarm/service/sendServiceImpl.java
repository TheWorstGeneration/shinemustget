package com.project.smg.alarm.service;

import com.project.smg.alarm.Handler.CustomWebSocketHandler;
import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.TitleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class sendServiceImpl implements sendService{
    private final CustomWebSocketHandler customWebSocketHandler;
    private final TitleRepository titleRepository;
    private final AlarmMakeService alarmMakeService;
    @Override
    public void sendAlarm(int id) {
        Title title = titleRepository.findById(id).orElse(null);

        String opponentId = title.getMember().getId();

        AlarmDto alarmDto = alarmMakeService.saveAlarm(opponentId, id);
        String message = alarmDto.getMessage() + " " + alarmDto.getFormattedCreatedAt();

        customWebSocketHandler.sendMessageToUser(opponentId, message);
    }
}
