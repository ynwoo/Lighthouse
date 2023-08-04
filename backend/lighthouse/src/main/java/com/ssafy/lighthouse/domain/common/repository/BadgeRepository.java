package com.ssafy.lighthouse.domain.common.repository;

import com.ssafy.lighthouse.domain.common.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
    @Query("select b from Badge b where b.id = :badgeId and b.isValid = 1")
    Optional<Badge> findByBadgeId(@Param("badgeId") Long badgeId);
}
