package com.project.smg.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SendAlarmDto {
    private String message;
    private String formattedCreatedAt;
    private double score;
}
