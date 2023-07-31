package com.ssafy.lighthouse.domain.user.repository;

import com.ssafy.lighthouse.domain.user.entity.Follow;
import com.ssafy.lighthouse.domain.user.entity.UserEval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    // remove -> find로 찾아와서 isValid 0으로 변경
    @Query("select fo from Follow fo where fo.followeeId = :followee and fo.followerId = :follower and fo.isValid = 1")
    Optional<Follow> find(@Param("followee") Long followee, @Param("follower") Long follower);
}
