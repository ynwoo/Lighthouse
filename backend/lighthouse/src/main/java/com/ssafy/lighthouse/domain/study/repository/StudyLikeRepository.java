package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.StudyLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface StudyLikeRepository extends JpaRepository<StudyLike, Long> {
    // insert는 기본 제공 save 사용

    // remove -> find로 찾아와서 isValid 0으로 변경
    @Query("select sl from StudyLike sl where sl.studyId = :studyId and sl.userId = :userId and sl.isValid = 1")
    Optional<StudyLike> find(@Param("studyId") Long studyId, @Param("userId") Long userId);

    // userId의 studyIdList
    @Query("select sl.studyId from StudyLike sl where sl.userId = :userId and sl.isValid = 1")
    List<Long> findAllByUserId(@Param("userId") Long userId);
}
