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
            Set<ZSetOperations.TypedTuple<AlarmDto>> alarms = zSetOperations.reverseRangeByScoreWithScores(memberId, 0, Double.POSITIVE_INFINITY, 0, 10);

            List<SendAlarmDto> alarmList = new ArrayList<>();
            for (ZSetOperations.TypedTuple<AlarmDto> tuple : alarms) {
                alarmList.add(new SendAlarmDto(tuple.getValue().getMessage(), tuple.getValue().getFormattedCreatedAt()));
//                AlarmDto alarm = tuple.getValue();
//
//                // createdAt 필드 형식화
//                LocalDateTime createdAt = alarm.getCreatedAt();
//                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//                String formattedCreatedAt = createdAt.format(formatter);
//
//                alarmList.add(new SendAlarmDto(alarm.getMessage(), formattedCreatedAt));
            }

            resultMap.put("alarms", alarmList);

            if (alarmList.size() < 10) {
                resultMap.put("lastScore", -1.0); // 더 이상 조회할 데이터가 없음을 표시
            } else {
                double newLastScore = alarms.iterator().next().getScore(); // 다음 조회의 시작점 Score 값을 추출
                resultMap.put("lastScore", newLastScore);
            }


        } else if (lastScore > 0) {
            // 이전 조회의 시작점을 기준으로 이어서 조회하는 경우
            Set<ZSetOperations.TypedTuple<AlarmDto>> alarms = zSetOperations.reverseRangeByScoreWithScores(memberId, lastScore, Double.POSITIVE_INFINITY, 0, 10);

            List<SendAlarmDto> alarmList = new ArrayList<>();
            for (ZSetOperations.TypedTuple<AlarmDto> tuple : alarms) {
                alarmList.add(new SendAlarmDto(tuple.getValue().getMessage(), tuple.getValue().getFormattedCreatedAt()));
            }

            resultMap.put("alarms", alarmList);

            if (alarmList.size() < 10) {
                resultMap.put("lastScore", -1.0); // 더 이상 조회할 데이터가 없음을 표시
            } else {
                double newLastScore = alarms.iterator().next().getScore(); // 다음 조회의 시작점 Score 값을 추출
                resultMap.put("lastScore", newLastScore);
            }

        } else {
            // 잘못된 lastScore 값이 전달된 경우
            resultMap.put("alarms", Collections.emptyList());
            resultMap.put("lastScore", -1.0);
        }

        return resultMap;
    }


}
