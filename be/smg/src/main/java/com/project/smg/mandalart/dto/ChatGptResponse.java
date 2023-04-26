package com.project.smg.mandalart.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatGptResponse {
    public String id;
    public String object;
    public int created;
    public List<Choice> choices;
    public Usage usage;
}
