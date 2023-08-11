package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.ParticipationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ParticipationHistoryRepository extends JpaRepository<ParticipationHistory, Long> {
    // insert는 기본 제공 save 사용

    // remove -> find로 찾아와서 isValid 0으로 변경
    @Query("select ph from ParticipationHistory ph where ph.studyId = :studyId and ph.userId = :userId and ph.isValid = 1")
    Optional<ParticipationHistory> find(@Param("studyId") Long studyId, @Param("userId") Long userId);

    // userId관련 studyId 리스트
    @Query("select ph.studyId from ParticipationHistory ph where ph.userId = :userId and ph.isValid = 1 and ph.status != 4")
    Set<Long> findStudyIdAllByUserId(@Param("userId") Long userId);

    // userId관련 studyId 리스트 (status로 구분)
    @Query("select ph.studyId from ParticipationHistory ph where ph.userId = :userId and ph.isValid = 1 and ph.status = :status")
    Set<Long> findStudyIdAllByUserIdandStatus(@Param("userId") Long userId, @Param("status") int status);
    
    // studyId에 해당하는 ParticipationHistory 리스트
    @Query("select ph from ParticipationHistory ph where ph.studyId = :studyId and ph.isValid = 1 and ph.status = :status")
    Set<ParticipationHistory> findAllByStudyId(@Param("studyId") Long studyId, @Param("status") int status);
}
