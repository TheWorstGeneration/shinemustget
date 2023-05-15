package com.project.smg.alarm.service;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.dto.SendAlarmDto;
import com.project.smg.alarm.repository.RedisAlarmRepository;
import com.project.smg.mandalart.entity.Title;
import com.project.smg.mandalart.repository.TitleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmMakeServiceImpl implements AlarmMakeService {
    private final RedisAlarmRepository redisAlarmRepository;
    private final TitleRepository titleRepository;

    @Override
    public AlarmDto saveAlarm(String memberId, int id) {
        Title title = titleRepository.findById(id).orElse(null);

        String message = "다른 사용자가 " + title.getContent() + " 만다라트에 좋아요 표시를 했습니다.";

        LocalDateTime time = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        AlarmDto alarmDto = AlarmDto.builder()
                .memberId(memberId)
                .titleName(title.getContent())
                .titleId(title.getId())
                .message(message)
                .createdAt(LocalDateTime.now())
                .formattedCreatedAt(time.format(formatter))
                .build();

        redisAlarmRepository.save(alarmDto);

        return alarmDto;
    }

    @Override
    public Map<String, Object> alarmDtoList(String memberId, double lastSocre) {
        log.info("메세지 목록 가져오기");
        Map<String, Object> map = redisAlarmRepository.getLatestAlarms(memberId, lastSocre);

        List<SendAlarmDto> sendAlarmDtoList = (List<SendAlarmDto>) map.get("alarms");
        double nextScore = (double) map.get("lastScore");

        log.info("메세지 조회 {}", sendAlarmDtoList.size());
        log.info("nextScore {}", nextScore);

        Map<String, Object> result = new HashMap<>();

        result.put("sendAlarmDtoList", sendAlarmDtoList);
        result.put("nextScore", nextScore);

        return result;
    }
}
