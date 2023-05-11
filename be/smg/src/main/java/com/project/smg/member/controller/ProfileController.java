package com.project.smg.member.controller;

import com.project.smg.common.ResponseDto;
import com.project.smg.member.dto.ClearDto;
import com.project.smg.member.dto.ClearMandalartDto;
import com.project.smg.member.dto.NowBigGoalDto;
import com.project.smg.member.dto.NowGoalDto;
import com.project.smg.member.service.ProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/profile")
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping("/readNowGoal")
    public ResponseEntity<?> nowGoal(@RequestAttribute("id") String memberId) {
        List<NowBigGoalDto> nowBigGoalDtoList = profileService.NowBigList(memberId);
        NowGoalDto nowGoalDto = profileService.NowGoalDto(memberId);

        if (nowBigGoalDtoList != null && nowGoalDto != null) {
            nowGoalDto.setNowBigGoalDtoList(nowBigGoalDtoList);
            log.info("BigGoal 리스트 조회 성공");
            return new ResponseEntity<>(nowGoalDto, HttpStatus.OK);
        }
        else {
            log.info("BigGoal 리스트 조회 실패");
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/readClearGoal")
    public ResponseEntity<?> clearGoal(@RequestAttribute("id") String memberId) {
        List<ClearDto> clearDtoList = profileService.ClearList(memberId);
        if (!clearDtoList.isEmpty()) {
            log.info("완료 목록 조회 성공");
            return new ResponseEntity<>(clearDtoList, HttpStatus.OK);
        }
        else {
            log.info("완료 목록 조회 실패");
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/readClearMandalart")
    public ResponseEntity<?> ClearMandalart(@RequestAttribute("id") String memberId) {
        List<ClearMandalartDto> clearMandalartDtoList = profileService.ClearMandalartList(memberId);
        if (!clearMandalartDtoList.isEmpty()) {
            log.info("완료한 만다라트 조회 성공");
            return new ResponseEntity<>(clearMandalartDtoList, HttpStatus.OK);
        }
        else {
            log.info("완료한 만다라트 조회 실패");
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/delete")
    public ResponseEntity<?> delete(@RequestAttribute("id") String memberId) {
        profileService.delete(memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
