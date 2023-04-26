package com.project.smg.member.repository;

import com.project.smg.member.entity.MemberPodo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberPodoRepository extends JpaRepository<MemberPodo, Integer> {
    // 멤버가 가진 멤버 포도의 포도타입의 아이디 리스트
    @Query("select mp.podoType.id from MemberPodo mp where mp.member.id =:memberId")
    List<Integer> findByName(@Param("memberId") String id);
}
