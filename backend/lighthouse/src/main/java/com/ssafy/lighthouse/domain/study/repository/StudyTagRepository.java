package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.StudyTag;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudyTagRepository extends JpaRepository<StudyTag, Long> {
    // insert는 기본 제공 save 사용

    // remove -> find로 찾아와서 isValid 0으로 변경
    @Query("select st from StudyTag st where st.studyId = :studyId and st.tagId = :tagId and st.isValid = 1")
    Optional<StudyTag> find(@Param("studyId") Long studyId, @Param("tagId") Long tagId);
}
