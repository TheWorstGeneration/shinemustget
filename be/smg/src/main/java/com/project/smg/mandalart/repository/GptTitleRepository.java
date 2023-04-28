package com.project.smg.mandalart.repository;

import com.project.smg.mandalart.entity.GptTitle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GptTitleRepository extends JpaRepository<GptTitle, Integer> {
    Optional<GptTitle> findByContent(String content);
}
