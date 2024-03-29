package com.project.smg.podo.repository;

import com.project.smg.mandalart.entity.SmallGoal;
import com.project.smg.podo.entity.Podo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PodoRepository extends JpaRepository<Podo, Integer> {
    @Query("select p from Podo p where p.smallGoal.id =:smallGoalId")
    List<Podo> findBySmallGoalId(@Param("smallGoalId") int id);

    @Query("select p from Podo p where p.smallGoal.id =:smallGoalId ORDER BY p.createdAt DESC")
    List<Podo> findBySmallGoalIdDesc(@Param("smallGoalId") int id);
    Optional<Podo> findTop1BySmallGoalOrderByIdDesc(SmallGoal smallGoal);

}
