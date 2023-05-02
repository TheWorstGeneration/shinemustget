package com.project.smg.mandalart.repository;

import com.project.smg.mandalart.entity.Title;
import com.project.smg.member.dto.ClearDto;
import com.project.smg.member.dto.ClearMandalartDto;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TitleRepository extends JpaRepository<Title, Integer> {
    Optional<Title> findTop1ByMemberOrderByClearAtDesc(String mid);
    Optional <Title> findTopByMemberIdOrderByCreatedAtDesc(String memberId);
    Optional<List<Title>> findByMemberIdAndClearAtIsNotNullOrderByClearAtDesc(String memberId);
}
