package com.project.smg.alarm.service;

import com.project.smg.alarm.Handler.CustomWebSocketHandler;
import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.dto.SendAlarmDto;
import com.project.smg.alarm.utils.ChatUtils;
import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.TitleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmSendServiceImpl implements AlarmSendService {
    private final CustomWebSocketHandler customWebSocketHandler;
    private final TitleRepository titleRepository;
    private final AlarmMakeService alarmMakeService;
    private final ChatUtils chatUtils;

    @Override
    public void sendAlarm(String nickname, int id) throws Exception {
        Title title = titleRepository.findById(id).orElse(null);

        String opponentId = title.getMember().getId();

        AlarmDto alarmDto = alarmMakeService.saveAlarm(opponentId, id, nickname);
//        String message = alarmDto.getMessage() + " " + alarmDto.getFormattedCreatedAt();
        customWebSocketHandler.sendMessageToUser(opponentId, new SendAlarmDto(alarmDto.getMessage(), alarmDto.getFormattedCreatedAt(), chatUtils.changeLocalDateTimeToDouble(alarmDto.getCreatedAt())));
    }
}
