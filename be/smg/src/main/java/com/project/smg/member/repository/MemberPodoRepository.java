package com.project.smg.member.repository;

import com.project.smg.member.entity.MemberPodo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberPodoRepository extends JpaRepository<MemberPodo, Integer> {
    // 멤버가 가진 멤버 포도의 포도타입의 아이디 리스트
    @Query("select mp from MemberPodo mp where mp.member.id =:memberId")
    List<MemberPodo> findByPodoTypeId(@Param("memberId") String id);
    @Query("select mp from MemberPodo mp where mp.podoType.id =:ptid and mp.member.id=:mid")
    Optional<MemberPodo> findByName(@Param("ptid")int ptid, @Param("mid")String mid);

    @Query("select count(mp) > 0 from MemberPodo mp where mp.podoType.id =:ptid and mp.member.id=:mid and mp.status =true")
    boolean isfindByPodoTypeId(@Param("ptid") int ptid, @Param("mid")String mid);



}
