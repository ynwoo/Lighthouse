package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Integer> {
}
