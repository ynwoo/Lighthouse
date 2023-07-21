package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.Study;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyRepository extends JpaRepository<Study, Integer> {

    @Override
    @EntityGraph(attributePaths = {"studyTags", "studyEvals"})
    List<Study> findAll();
}
