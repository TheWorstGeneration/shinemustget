package com.project.smg.member.service;

import com.project.smg.member.dto.MemberInfoDto;

public interface MemberService {
    void logout(String accessToken);
    MemberInfoDto memberInfo(String memberId);
    void addMemberPodo(String accessToken);
}
