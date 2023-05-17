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

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmSendServiceImpl implements AlarmSendService {
    private final CustomWebSocketHandler customWebSocketHandler;
    private final TitleRepository titleRepository;
    private final AlarmMakeService alarmMakeService;
    private final ChatUtils chatUtils;

    @Override
    public void sendLikeAlarm(String nickname, int id) throws Exception {
        Optional<Title> optionalTitle = titleRepository.findById(id);

        if (optionalTitle.isPresent()) {
            Title title = optionalTitle.get();
            String opponentId = title.getMember().getId();
            AlarmDto alarmDto = alarmMakeService.saveLikeAlarm(opponentId, id, nickname);
            sendMessage(opponentId, alarmDto);
        } else {
            log.warn("존재하지 않는 title");
        }
    }

    @Override
    public void sendPodoAlarm(String memberId) throws Exception {
        AlarmDto alarmDto = alarmMakeService.savePodoAlarm(memberId);
        sendMessage(memberId, alarmDto);
    }

    private void sendMessage(String memberId, AlarmDto alarmDto) throws Exception {
        customWebSocketHandler.sendMessageToUser(memberId,
                new SendAlarmDto(alarmDto.getMessage(),
                        alarmDto.getFormattedCreatedAt(),
                        chatUtils.changeLocalDateTimeToDouble(alarmDto.getCreatedAt())));
    }
}
