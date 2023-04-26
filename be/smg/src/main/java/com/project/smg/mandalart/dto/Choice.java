package com.project.smg.mandalart.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Choice {
    public int index;
    public Message message;
    public String finish_reason;
}
