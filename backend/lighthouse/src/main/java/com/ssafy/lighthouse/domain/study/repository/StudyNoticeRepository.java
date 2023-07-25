package com.ssafy.lighthouse.domain.study.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.lighthouse.domain.study.entity.StudyNotice;

public interface StudyNoticeRepository extends JpaRepository<StudyNotice, Integer> {
	@EntityGraph(attributePaths = {"studyNoticeChecks"})
	@Query(value = "SELECT sn FROM StudyNotice sn WHERE  sn.isValid = 1 AND sn.studyId = :studyId")
	public List<StudyNotice> findByStudyId(@Param("studyId") Long studyId);
}
