package com.project.smg.mandalart.repository;

import com.project.smg.mandalart.entity.Title;
import com.project.smg.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TitleRepository extends JpaRepository<Title, Integer> {
    Optional <Title> findTopByMemberIdAndClearAtIsNullOrderByCreatedAtDesc(String memberId);
    Optional<List<Title>> findByMemberIdAndClearAtIsNotNullOrderByClearAtDesc(String memberId);
    Optional<Title> findTop1ByMemberOrderByIdDesc(Member member);
    Optional<Title> findById(int id);
}
