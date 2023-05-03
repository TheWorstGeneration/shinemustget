package com.project.smg.mandalart.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

@ExtendWith(MockitoExtension.class)
class MandalartServiceImplTest {

    @InjectMocks
    private MandalartServiceImpl mandalartService;

    @Mock
    private RestTemplate restTemplate;

    @Test
    void getChatGptResponse() {
    }


//    @Test
//    void getBigGoals() {
//        // given
//        String contents = "test";
//        String prompt = contents + "이/가 되기 위해 필요한 8가지 목표를 간략히 나열해주세요";
//        ChatGptResponse chatGptResponse = new ChatGptResponse();
//        Choice choice = new Choice();
//        Message message = new Message();
//        message.setContent("1. goal 1\n2. goal 2\n3. goal 3");
//        choice.setMessage(message);
//        chatGptResponse.setChoices(Arrays.asList(choice));
//
//        // when
//        HashMap<String, List<String>> result = mandalartService.getBigGoals(contents);
//
//        // then
//        assertEquals(result.size(), 1);
//        List<String> goals = result.get(message.getContent());
//        assertEquals(goals.size(), 3);
//        assertEquals(goals.get(0), "goal 1");
//        assertEquals(goals.get(1), "goal 2");
//        assertEquals(goals.get(2), "goal 3");
//    }
}