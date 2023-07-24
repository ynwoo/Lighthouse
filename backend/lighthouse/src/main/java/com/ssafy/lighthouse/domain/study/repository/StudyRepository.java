package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.Study;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Integer>, StudyRepositoryCustom {
    // 조건별로 동적 쿼리 필요 -> 추후 querydsl 적용
    @Override
    @EntityGraph(attributePaths = {"studyTags"})
    @Query("select s from Study s where s.isValid = 1")
    List<Study> findAll();

    // 상세 정보 조회 (복제, 상세정보)
    @EntityGraph(attributePaths = {"studyTags", "studyEvals"})
    @Query("select s from Study s where s.id = :id and s.isValid = 1")
    Optional<Study> findDetailById(@Param("id") int id);

    // 단순 조회 (공유, 삭제용)
    @Query("select s from Study s where s.id = :id and s.isValid = 1")
    Optional<Study> findById(@Param("id") int id);
}
