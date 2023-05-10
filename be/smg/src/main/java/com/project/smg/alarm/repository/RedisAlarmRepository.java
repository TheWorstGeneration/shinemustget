package com.project.smg.alarm.repository;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.utils.ChatUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class RedisAlarmRepository implements AlarmRepository {
    private final RedisTemplate<String, AlarmDto> alarmRedisTemplate;
    private final ChatUtils chatUtils;
    private ZSetOperations<String, AlarmDto> zSetOperations;

    @PostConstruct
    private void init() {
        zSetOperations = alarmRedisTemplate.opsForZSet();
    }

    @Override
    public void save(AlarmDto alarmDto) {
        zSetOperations.add(alarmDto.getMemberId(), alarmDto, chatUtils.changeLocalDateTimeToDouble(alarmDto.getCreatedAt()));
    }

    // Cursor 값을 사용하여 지속적으로 AlarmDto 객체를 가져오는 메소드
//    @Override
//    public List<AlarmDto> getRecentAlarmsWithCursor(String memberId, int limit) {
//        String key = memberId;
//        String pattern = "*";
//        int count = limit;
//
//        List<AlarmDto> alarms = new ArrayList<>();
//        Cursor<ZSetOperations.TypedTuple<AlarmDto>> cursor = alarmRedisTemplate.opsForZSet().scan(key, ScanOptions.scanOptions().match(pattern).count(count).build());
//
//        while (cursor.hasNext()) {
//            ZSetOperations.TypedTuple<AlarmDto> tuple = cursor.next();
//            alarms.add(tuple.getValue());
//        }
//
//        return alarms;
//    }
    @Override
    public List<AlarmDto> getRecentAlarmsWithCursor(String memberId, int limit) {
        String key = memberId;
        String pattern = "*";
        int count = limit;
        long cursor = 0;

        List<AlarmDto> alarms = new ArrayList<>();
        ScanOptions options = ScanOptions.scanOptions().match(pattern).count(count).build();
        do {
            Cursor<ZSetOperations.TypedTuple<AlarmDto>> scanCursor = zSetOperations.scan(key, options);
            while (scanCursor.hasNext()) {
                ZSetOperations.TypedTuple<AlarmDto> tuple = scanCursor.next();
                alarms.add(tuple.getValue());
            }
            cursor = scanCursor.getPosition();
        } while (cursor > 0);

        return alarms;
    }

}
