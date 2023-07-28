package com.ssafy.lighthouse.domain.study.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.study.entity.Qna;

public interface QnaRepository extends JpaRepository<Qna, Long> {
}
