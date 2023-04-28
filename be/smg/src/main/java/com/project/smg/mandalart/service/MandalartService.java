package com.project.smg.mandalart.service;

import com.project.smg.mandalart.dto.ChatGptResponse;

import java.util.HashMap;
import java.util.List;

public interface MandalartService {
    public ChatGptResponse getChatGptResponse(String content);
    public HashMap<String, List<String>> getBigGoals(String content);
    public HashMap<String, List<String>> getSmallGoals(List<String> bigGoal);
}
