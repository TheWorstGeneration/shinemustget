package com.project.smg.alarm.controller;

import com.project.smg.alarm.service.AlarmMakeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class testController {
    private final AlarmMakeService alarmMakeService;

    @PostMapping("/test/{id}")
    public ResponseEntity<?> test(@RequestAttribute("id") String memberId, @PathVariable("id") int id) {
        return new ResponseEntity<>(alarmMakeService.saveAlarm(memberId, id), HttpStatus.OK);
    }
}
