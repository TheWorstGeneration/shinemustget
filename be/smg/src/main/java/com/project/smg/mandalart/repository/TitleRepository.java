package com.project.smg.mandalart.repository;

import com.project.smg.mandalart.entity.Title;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TitleRepository extends JpaRepository<Title, Integer> {
    Optional<Title> findTop1ByMemberOrderByClearAtDesc(String mid);
}
