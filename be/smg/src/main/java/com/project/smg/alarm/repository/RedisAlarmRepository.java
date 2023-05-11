package com.project.smg.alarm.repository;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.utils.ChatUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

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

    public Map<String, Object> getLatestAlarms(String memberId, Double lastScore, int count) {
        // 마지막으로 조회된 객체의 다음 객체부터 역순으로 일정 개수의 객체를 조회
        Set<AlarmDto> alarms;

        if (lastScore != null) {
            alarms = zSetOperations.reverseRangeByScore(memberId, lastScore - 1, 0, 0, count);
            System.out.println(alarms.toString());
        } else {
            alarms = zSetOperations.reverseRangeByScore(memberId, Double.POSITIVE_INFINITY, 0, 0, count);
        }

        // Set을 List로 변환
        List<AlarmDto> alarmList = new ArrayList<>(alarms);

        for(int i = 0; i < alarmList.size(); i++){
            System.out.println(alarmList.get(i).toString());
        }

        // 조회된 객체의 개수와 마지막 객체의 Score 값을 포함한 Map 생성
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("count", alarmList.size());
        if (!alarmList.isEmpty()) {
            resultMap.put("lastScore", chatUtils.changeLocalDateTimeToDouble(alarmList.get(alarmList.size() - 1).getCreatedAt()));
        }
        else {
            resultMap.put("lastScore", -1.0); // 빈 Set이 반환된 경우
        }
        resultMap.put("alarms", alarmList);
        // Map 반환
        return resultMap;
    }

}
