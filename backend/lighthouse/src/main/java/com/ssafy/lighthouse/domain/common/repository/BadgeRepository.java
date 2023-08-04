package com.ssafy.lighthouse.domain.common.repository;

import com.ssafy.lighthouse.domain.common.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
}
