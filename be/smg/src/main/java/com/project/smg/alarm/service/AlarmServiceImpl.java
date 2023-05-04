package com.project.smg.alarm.service;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.repository.RedisAlarmRepository;
import com.project.smg.mandalart.entity.Title;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {
    private final RedisAlarmRepository redisAlarmRepository;

    @Override
    public AlarmDto saveAlarm(String memberId, Title tilte) {
        String message = "다른 사용자가 " + tilte.getContent() + " 만다라트에 좋아요 표시를 했습니다.";

        AlarmDto alarmDto = AlarmDto.builder()
                .memberId(memberId)
                .titleName(tilte.getContent())
                .titleId(tilte.getId())
                .message(message)
                .createdAt(LocalDateTime.now())
                .build();

        redisAlarmRepository.save(alarmDto);

        return alarmDto;
    }
}
