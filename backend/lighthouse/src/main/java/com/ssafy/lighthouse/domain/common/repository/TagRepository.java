package com.ssafy.lighthouse.domain.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.common.entity.Tag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query("select new com.ssafy.lighthouse.domain.common.dto.TagDto(t) from Tag t where t.id in (:tagIds) and t.isValid = 1")
    Set<Tag> findAllByTagIds(@Param("tagIds") List<Long> tagIds);
}
