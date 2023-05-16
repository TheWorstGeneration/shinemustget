package com.project.smg.alarm.repository;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.dto.SendAlarmDto;
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
    private static final double NO_MORE_ALARMS = -1.0;
    private static final int MAX_ALARM_COUNT = 10;

    @PostConstruct
    private void init() {
        zSetOperations = alarmRedisTemplate.opsForZSet();
    }

    @Override
    public void save(AlarmDto alarmDto) {
        zSetOperations.add(alarmDto.getMemberId(), alarmDto, chatUtils.changeLocalDateTimeToDouble(alarmDto.getCreatedAt()));
    }

    public Map<String, Object> getLatestAlarms(String memberId, double lastScore) {
        Map<String, Object> resultMap = new HashMap<>();

        if (lastScore == 0) {
            // 처음부터 조회하는 경우
            Set<ZSetOperations.TypedTuple<AlarmDto>> alarms = zSetOperations.reverseRangeByScoreWithScores(memberId, 0, Double.POSITIVE_INFINITY, 0, MAX_ALARM_COUNT);
            processAlarms(alarms, resultMap);

        } else if (lastScore > 0) {
            // 이전 조회의 시작점을 기준으로 이어서 조회하는 경우
            Set<ZSetOperations.TypedTuple<AlarmDto>> alarms = zSetOperations.reverseRangeByScoreWithScores(memberId, 0, lastScore, 0, MAX_ALARM_COUNT);
            alarms.removeIf(tuple -> tuple.getScore() >= lastScore);
            processAlarms(alarms, resultMap);

        } else {
            // 잘못된 lastScore 값이 전달된 경우
            resultMap.put("alarms", Collections.emptyList());
            resultMap.put("lastScore", NO_MORE_ALARMS);
        }

        return resultMap;
    }

    public boolean delete(String memberId, double deleteStart, double deleteEnd){
        Long removedCount = zSetOperations.removeRangeByScore(memberId, deleteStart, deleteEnd);
        return removedCount != null && removedCount > 0;
    }

    private void processAlarms(Set<ZSetOperations.TypedTuple<AlarmDto>> alarms, Map<String, Object> resultMap) {
        List<SendAlarmDto> alarmList = new ArrayList<>();
        double minScore = Double.MAX_VALUE;

        for (ZSetOperations.TypedTuple<AlarmDto> tuple : alarms) {
            double score = tuple.getScore();
            alarmList.add(new SendAlarmDto(tuple.getValue().getMessage(), tuple.getValue().getFormattedCreatedAt(), score));
            if (score < minScore) {
                minScore = score;
            }
        }

        resultMap.put("alarms", alarmList);

        if (alarmList.size() < MAX_ALARM_COUNT) {
            resultMap.put("lastScore", NO_MORE_ALARMS);
        } else {
            resultMap.put("lastScore", minScore);
        }
    }
}
