package com.project.smg.member.repository;

import com.project.smg.member.entity.MemberPodo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberPodoRepository extends JpaRepository<MemberPodo, Integer> {
    @Query("select mp from MemberPodo mp where mp.member.id =:memberId")
    List<MemberPodo> findByName(@Param("memberId") String id);
}
