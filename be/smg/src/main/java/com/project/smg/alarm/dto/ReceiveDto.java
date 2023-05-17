package com.project.smg.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReceiveDto {
    private String cursor;
    private String deleteStart;
    private String deleteEnd;
}
