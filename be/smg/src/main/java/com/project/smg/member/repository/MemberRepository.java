package com.project.smg.member.repository;

import com.project.smg.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findById(String id);

    @Query("select m from Member m where m.refreshToken.refreshToken =:rt")
    Optional<Member> findByRefreshToken(@Param("rt") String refreshToken);
}
