package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.dto.SimpleStudyDto;
import com.ssafy.lighthouse.domain.study.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyRepository extends JpaRepository<Study, Long>, StudyRepositoryCustom {
    // 상세 정보 조회 (상세정보)
    @EntityGraph(attributePaths = {"badge", "studyTags", "studyEvals", "studyNotices", "sessions", "qnas", "participations"})
    Optional<Study> findDetailById(@Param("studyId") Long studyId);

    // 상세 정보 조회 (복제)
    @EntityGraph(attributePaths = {"badge", "studyTags", "studyNotices", "sessions"})
    @Query("select s from Study s where s.id = :studyId and s.isValid = 1")
    Optional<Study> findSimpleDetailById(@Param("studyId") Long studyId);

    // 단순 조회 (공유, 삭제용)
    @Query("select s from Study s where s.id = :studyId and s.isValid = 1")
    Optional<Study> findById(@Param("studyId") Long studyId);

    // 이전 스터디 목록 (좋아요 순)
    @Query("select new com.ssafy.lighthouse.domain.study.dto.SimpleStudyDto(s) from Study s where s.originalId = :originalId and s.isValid = 1 and s.status = 3 order by s.likeCnt desc ")
    Page<SimpleStudyDto> findAllByOriginalId(@Param("originalId") Long originalId, Pageable pageable);
}
