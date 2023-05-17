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
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmMakeServiceImpl implements AlarmMakeService {
    private final RedisAlarmRepository redisAlarmRepository;
    private final TitleRepository titleRepository;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("MM-dd HH:mm");


    @Override
    public AlarmDto saveLikeAlarm(String memberId, int id, String nickname) {
        Optional<Title> optionalTitle = titleRepository.findById(id);

        if (optionalTitle.isPresent()) {
            Title title = optionalTitle.get();
            String message = nickname + "님이 " + title.getContent() + " 만다라트를 좋아합니다.💖";
            LocalDateTime time = LocalDateTime.now();

            AlarmDto alarmDto = AlarmDto.builder()
                    .memberId(memberId)
                    .titleName(title.getContent())
                    .titleId(title.getId())
                    .message(message)
                    .createdAt(time)
                    .formattedCreatedAt(time.format(FORMATTER))
                    .build();

            redisAlarmRepository.save(alarmDto);
            return alarmDto;
        } else {
            log.warn("존재하지 않는 title");
            return null;
        }
    }

    @Override
    public AlarmDto savePodoAlarm(String memberId) {
        String message = "축하합니다. 26일 동안 스페셜 포도🍇를 사용할 수 있습니다.";
        LocalDateTime time = LocalDateTime.now();

        AlarmDto alarmDto = AlarmDto.builder()
                .memberId(memberId)
                .message(message)
                .createdAt(time)
                .formattedCreatedAt(time.format(FORMATTER))
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
