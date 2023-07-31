package com.ssafy.lighthouse.domain.user.repository;

import com.ssafy.lighthouse.domain.user.entity.UserEval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserEvalRepository extends JpaRepository<UserEval, Long> {
}
