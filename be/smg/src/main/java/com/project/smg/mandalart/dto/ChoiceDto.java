package com.project.smg.mandalart.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChoiceDto {
    public int index;
    public MessageDto message;
    public String finish_reason;
}
