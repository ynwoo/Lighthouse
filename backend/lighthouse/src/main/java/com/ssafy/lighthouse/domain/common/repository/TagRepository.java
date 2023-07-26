package com.ssafy.lighthouse.domain.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.common.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {

}
