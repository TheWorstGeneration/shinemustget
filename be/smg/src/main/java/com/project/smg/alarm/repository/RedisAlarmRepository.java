package com.project.smg.alarm.repository;

import com.project.smg.alarm.dto.AlarmDto;
import com.project.smg.alarm.dto.LatestAlarmsResultDto;
import com.project.smg.alarm.dto.SendAlarmDto;
import com.project.smg.alarm.utils.ChatUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

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

    /**
     * 알람을 저장합니다. 저장 시간을 score로 사용해서 정렬
     *
     * @param alarmDto 저장할 알람 객체
     */
    @Override
    public void save(AlarmDto alarmDto) {
        zSetOperations.add(alarmDto.getMemberId(), alarmDto, chatUtils.changeLocalDateTimeToDouble(alarmDto.getCreatedAt()));
    }

    /**
     * 최신 알람을 조회합니다.
     *
     * @param memberId  알람을 조회할 사용자 ID
     * @param lastScore 이전 조회의 마지막 점수
     * @return 최신 알람과 마지막 점수를 담은 결과 맵
     */
    public LatestAlarmsResultDto getLatestAlarms(String memberId, double lastScore) {
        LatestAlarmsResultDto latestAlarmsResultDto = new LatestAlarmsResultDto();

        if (lastScore == 0) {
            // 처음부터 조회하는 경우
            Set<ZSetOperations.TypedTuple<AlarmDto>> alarms = zSetOperations.reverseRangeByScoreWithScores(memberId, 0, Double.POSITIVE_INFINITY, 0, MAX_ALARM_COUNT);
            if (alarms == null || alarms.isEmpty()) {
                return sendLastPoint(latestAlarmsResultDto);
            } else {
                processAlarms(alarms, latestAlarmsResultDto);
            }

        } else if (lastScore > 0) {
            // 이전 조회의 시작점을 기준으로 이어서 조회하는 경우
            Set<ZSetOperations.TypedTuple<AlarmDto>> alarms = zSetOperations.reverseRangeByScoreWithScores(memberId, 0, lastScore, 0, MAX_ALARM_COUNT);
            if (alarms == null || alarms.isEmpty()) {
                return sendLastPoint(latestAlarmsResultDto);
            } else {
                processAlarms(alarms, latestAlarmsResultDto);
            }
        } else {
            // 잘못된 lastScore 값이 전달된 경우
            return sendLastPoint(latestAlarmsResultDto);
        }

        return latestAlarmsResultDto;
    }

    public boolean delete(String memberId, double deleteStart, double deleteEnd) {
        if (deleteStart > deleteEnd) {
            double tmp = deleteStart;
            deleteStart = deleteEnd;
            deleteEnd = tmp;
        }

        Set<AlarmDto> valuesToDelete = zSetOperations.rangeByScore(memberId, deleteStart, deleteEnd);

        if (valuesToDelete == null || valuesToDelete.isEmpty())
            return false;

        Long removedCount = zSetOperations.remove(memberId, valuesToDelete.toArray());
        return removedCount != null && removedCount > 0;
    }

    /**
     * getLatestAlarms의 실행 결과로 나온 알람들을 처리하고 결과를 맵에 저장합니다.
     *
     * @param alarms                처리할 알람 목록
     * @param latestAlarmsResultDto 처리 결과를 저장할 LatestAlarmsResultDto
     */
    private void processAlarms(Set<ZSetOperations.TypedTuple<AlarmDto>> alarms, LatestAlarmsResultDto latestAlarmsResultDto) {
        List<SendAlarmDto> alarmList = new ArrayList<>();
        double minScore = Double.MAX_VALUE;

        for (ZSetOperations.TypedTuple<AlarmDto> tuple : alarms) {
            double score = tuple.getScore();
            alarmList.add(new SendAlarmDto(tuple.getValue().getMessage(), tuple.getValue().getFormattedCreatedAt(), score));
            if (score < minScore) {
                minScore = score;
            }
        }

        latestAlarmsResultDto.setAlarms(alarmList);

        if (alarmList.size() < MAX_ALARM_COUNT) {
            latestAlarmsResultDto.setLastScore(NO_MORE_ALARMS);
        } else {
            latestAlarmsResultDto.setLastScore(minScore);
        }
    }

    private LatestAlarmsResultDto sendLastPoint(LatestAlarmsResultDto latestAlarmsResultDto) {
        latestAlarmsResultDto.setAlarms(Collections.emptyList());
        latestAlarmsResultDto.setLastScore(NO_MORE_ALARMS);
        return latestAlarmsResultDto;
    }
}
