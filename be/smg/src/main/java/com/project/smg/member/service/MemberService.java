package com.project.smg.member.service;

import com.project.smg.member.dto.MemberInfoDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface MemberService {
    void logout(HttpServletRequest request, HttpServletResponse response);
    MemberInfoDto memberInfo(String memberId);
    void addMemberPodo(String memberId);
}
