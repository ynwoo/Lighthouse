package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.Bookmark;
import com.ssafy.lighthouse.domain.study.entity.StudyEval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudyEvalRepository extends JpaRepository<StudyEval, Integer> {
    // insert는 기본 제공 save 사용

    // remove -> find로 찾아와서 isValid 0으로 변경
    @Query("select se from StudyEval se where se.studyId = :studyId and se.userId = :userId and se.isValid = 1")
    Optional<StudyEval> find(@Param("studyId") int studyId, @Param("userId") int userId);
}
