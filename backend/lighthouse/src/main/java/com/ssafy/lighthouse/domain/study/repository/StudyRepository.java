package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.dto.StudyDto;
import com.ssafy.lighthouse.domain.study.entity.Study;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer>, StudyRepositoryCustom {
    // 상세 정보 조회 (복제, 상세정보)
    @EntityGraph(attributePaths = {"original", "leader", "sido", "gugun", "studyTags", "studyEvals"})
    @Query("select s from Study s where s.id = :studyId and s.isValid = 1")
    Optional<Study> findDetailById(@Param("studyId") Long studyId);

    // 단순 조회 (공유, 삭제용)
    @Query("select s from Study s where s.id = :studyId and s.isValid = 1")
    Optional<Study> findById(@Param("studyId") Long studyId);
}
