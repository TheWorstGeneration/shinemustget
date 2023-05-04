package com.project.smg.member.service;

import com.project.smg.member.dto.ClearDto;
import com.project.smg.member.dto.ClearMandalartDto;
import com.project.smg.member.dto.NowBigGoalDto;
import com.project.smg.member.dto.NowGoalDto;

import java.util.List;

public interface ProfileService {
    List<NowBigGoalDto> NowBigList(String memberId);
    List<ClearDto> ClearList(String memberId);
    NowGoalDto NowGoalDto(String memberId);
    List<ClearMandalartDto> ClearMandalartList(String memberId);
    void delete(String memberId);
}
