package com.ssafy.lighthouse.domain.user.repository;

import com.ssafy.lighthouse.domain.user.entity.UserBadge;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {

    // userId에 해당하는 badgeId List (생성 순)
    @EntityGraph(attributePaths = {"badge"})
    @Query("select ub from UserBadge ub where ub.userId = :userId and ub.isValid = 1 order by ub.createdAt desc ")
    List<UserBadge> findBadgeIdAllByUserId(@Param("userId") Long userId);
}
