package com.ssafy.lighthouse.domain.study.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.lighthouse.domain.study.entity.Session;

public interface SessionRepository extends JpaRepository<Session, Long> {

	@EntityGraph(attributePaths = {"studyMaterials", "sessionChecks"})
	@Query(value = "SELECT s FROM Session s WHERE  s.isValid = 1 AND s.studyId = :studyId ORDER BY s.seqNum")
	List<Session> findByStudyId(@Param("studyId") Long studyId);
}
