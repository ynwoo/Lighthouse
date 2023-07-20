package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.StudyTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudyTagRepository extends JpaRepository<StudyTag, Integer> {
    // insert는 기본 제공 save(StudyTag studyTag) 사용
    
    // update는 find로 찾아서 요소 바꾸기
    @Query("select st from StudyTag st where st.studyId = :studyId and st.tagId = :tagId and st.isValid = 1")
    Optional<StudyTag> findByStudyIdAndTagIdAndIsValid(@Param("studyId") int studyId, @Param("tagId") int tagId);
}
