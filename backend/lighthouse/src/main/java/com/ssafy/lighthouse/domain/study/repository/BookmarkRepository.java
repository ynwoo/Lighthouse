package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    // insert는 기본 제공 save 사용
    
    // remove -> find로 찾아와서 isValid 0으로 변경
    @Query("select bm from Bookmark bm where bm.studyId = :studyId and bm.userId = :userId and bm.isValid = 1")
    Optional<Bookmark> find(@Param("studyId") int studyId, @Param("userId") int userId);

    // update -> db에 직접 업데이트
//    @Modifying(clearAutomatically = true)
//    @Query("update Bookmark bm set bm.isValid = 0 where bm.studyId = :studyId and bm.userId = :userId and bm.isValid = 1")
//    int update(@Param("studyId") int studyId, @Param("userId") int userId);
}
