package com.project.smg.mandalart.repository;

import com.project.smg.mandalart.entity.Title;
import com.project.smg.member.dto.ClearDto;
import com.project.smg.member.dto.ClearMandalartDto;
import com.project.smg.member.entity.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TitleRepository extends JpaRepository<Title, Integer> {
    Optional <Title> findTopByMemberIdAndClearAtIsNullOrderByCreatedAtDesc(String memberId);
    Optional<List<Title>> findByMemberIdAndClearAtIsNotNullOrderByClearAtDesc(String memberId);
    Optional<Title> findTop1ByMemberOrderByIdDesc(Member member);
    Page<Title> findByContentAndClearAtIsNotNullOrderByLikeCntDesc(String word, Pageable pageable);
}
