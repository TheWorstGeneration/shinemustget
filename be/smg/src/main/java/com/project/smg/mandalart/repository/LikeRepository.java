package com.project.smg.mandalart.repository;

import com.project.smg.member.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Likes, Integer> {
    @Query("select l from Likes l where l.member.id =:mid")
    Optional<Likes> findByMember(@Param("mid") String mid);
}
