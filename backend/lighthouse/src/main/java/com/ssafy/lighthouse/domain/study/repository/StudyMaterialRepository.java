package com.ssafy.lighthouse.domain.study.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.lighthouse.domain.study.entity.StudyMaterial;

public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {
	@Query(value = "SELECT sm FROM StudyMaterial sm WHERE  sm.isValid = 1 AND sm.studyId = :studyId")
	List<StudyMaterial> findByStudyId(@Param("studyId") Long studyId);

	@Query(value = "SELECT sm FROM StudyMaterial sm WHERE  sm.isValid = 1 AND sm.sessionId = :sessionId")
	List<StudyMaterial> findBySessionId(@Param("sessionId") Long sessionId);
}
