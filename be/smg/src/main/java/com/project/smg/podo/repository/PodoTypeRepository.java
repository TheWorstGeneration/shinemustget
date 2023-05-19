package com.project.smg.podo.repository;

import com.project.smg.podo.entity.Podo;
import com.project.smg.podo.entity.PodoType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PodoTypeRepository extends JpaRepository<PodoType, Integer> {

    PodoType findByImageUrl(String imageUrl);

}
