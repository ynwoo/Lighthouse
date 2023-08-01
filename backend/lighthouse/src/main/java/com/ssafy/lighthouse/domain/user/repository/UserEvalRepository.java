package com.ssafy.lighthouse.domain.user.repository;

import com.ssafy.lighthouse.domain.user.entity.UserEval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserEvalRepository extends JpaRepository<UserEval, Long> {
    // remove -> find로 찾아와서 isValid 0으로 변경
    @Query("select ue from UserEval ue where ue.userId = :userId and ue.evaluatorId = :evaluatorId and ue.isValid = 1")
    Optional<UserEval> find(@Param("userId") Long userId, @Param("evaluatorId") Long evaluatorId);
}
