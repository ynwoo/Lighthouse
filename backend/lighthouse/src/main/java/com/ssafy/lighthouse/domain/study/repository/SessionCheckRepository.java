package com.ssafy.lighthouse.domain.study.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.study.entity.SessionCheck;

public interface SessionCheckRepository extends JpaRepository<SessionCheck, Integer> {
}
