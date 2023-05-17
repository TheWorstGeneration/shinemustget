package com.project.smg.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LatestAlarmsResultDto {
    private List<SendAlarmDto> alarms;
    private double lastScore;
}
