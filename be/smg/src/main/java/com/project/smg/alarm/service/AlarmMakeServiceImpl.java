package com.project.smg.alarm.service;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.dto.LatestAlarmsResultDto;
import com.project.smg.alarm.repository.RedisAlarmRepository;
import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.TitleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmMakeServiceImpl implements AlarmMakeService {
    private final RedisAlarmRepository redisAlarmRepository;
    private final TitleRepository titleRepository;

    @Override
    public AlarmDto saveLikeAlarm(String memberId, int id, String nickname) {
        Title title = titleRepository.findById(id).orElse(null);

        if (title == null) {
            return null;
        }

        String message = nickname + "님이 " + title.getContent() + " 만다라트를 좋아합니다.";

        LocalDateTime time = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd HH:mm");

        AlarmDto alarmDto = AlarmDto.builder()
                .memberId(memberId)
                .titleName(title.getContent())
                .titleId(title.getId())
                .message(message)
                .createdAt(time)
                .formattedCreatedAt(time.format(formatter))
                .build();

        redisAlarmRepository.save(alarmDto);

        return alarmDto;
    }

    @Override
    public AlarmDto savePodoAlarm(String memberId) {
        String message = "축하합니다. 26일 동안 스페셜 포도🍇를 사용할 수 있습니다.";
        LocalDateTime time = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd HH:mm");

        AlarmDto alarmDto = AlarmDto.builder()
                .memberId(memberId)
                .message(message)
                .createdAt(time)
                .formattedCreatedAt(time.format(formatter))
                .build();

        redisAlarmRepository.save(alarmDto);

        return alarmDto;
    }

    @Override
    public LatestAlarmsResultDto alarmDtoList(String memberId, double lastSocre) {
        return redisAlarmRepository.getLatestAlarms(memberId, lastSocre);
    }

    @Override
    public boolean deleteAlarm(String memberId, double deleteStart, double deleteEnd) {
        return redisAlarmRepository.delete(memberId, deleteStart, deleteEnd);
    }
}
