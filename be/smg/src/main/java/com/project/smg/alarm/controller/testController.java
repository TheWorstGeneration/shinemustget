package com.project.smg.alarm.controller;

import com.project.smg.alarm.service.AlarmService;
import com.project.smg.mandalart.entity.Title;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@Slf4j
@RestController
@RequiredArgsConstructor
public class testController {
    private final AlarmService alarmService;

    @PostMapping("/test")
    public ResponseEntity<?> test(@RequestAttribute("id") String memberId, @RequestBody Title title) {
        return new ResponseEntity<>(alarmService.saveAlarm(memberId, title), HttpStatus.OK);
    }
}
