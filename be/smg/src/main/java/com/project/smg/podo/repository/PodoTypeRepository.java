package com.project.smg.podo.repository;

import com.project.smg.podo.entity.PodoType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PodoTypeRepository extends JpaRepository<PodoType, Integer> {
    PodoType findByName(String stickerType);
}
