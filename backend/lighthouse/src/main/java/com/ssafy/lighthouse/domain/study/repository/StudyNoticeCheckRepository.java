package com.ssafy.lighthouse.domain.study.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.study.entity.StudyNoticeCheck;

public interface StudyNoticeCheckRepository extends JpaRepository<StudyNoticeCheck, Long> {
}
