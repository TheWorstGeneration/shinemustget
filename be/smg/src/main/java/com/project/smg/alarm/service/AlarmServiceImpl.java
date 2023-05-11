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
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {
    private final RedisAlarmRepository redisAlarmRepository;
    private final TitleRepository titleRepository;

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
    public Map<String, Object> alarmDtoList(String memberId, double lastSocre) {
        log.info("메세지 목록 가져오기");
        Map<String, Object> map = redisAlarmRepository.getLatestAlarms(memberId, lastSocre);
        List<AlarmDto> alarmDtoList = (List<AlarmDto>) map.get("alarms");

        List<SendAlarmDto> sendAlarmDtoList = alarmDtoList.stream()
                .map(dto -> new SendAlarmDto(dto.getMessage(), dto.getCreatedAt()))
                .collect(Collectors.toList());

        double nextSocre = (double) map.get("lastScore");

        log.info("메세지 조회 {}", sendAlarmDtoList.size());
        log.info("nextSocre {}", nextSocre);

        Map<String, Object> result = new HashMap<>();

        result.put("sendAlarmDtoList", sendAlarmDtoList);
        result.put("nextSocre", nextSocre);

        return result;
    }
}
