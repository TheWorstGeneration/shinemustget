package com.project.smg.member.service;

import com.project.smg.member.dto.MemberInfoDto;

public interface MemberService {
    void logout();
    MemberInfoDto memberInfo(String memberId);
    void addMemberPodo(String memberId);
}
