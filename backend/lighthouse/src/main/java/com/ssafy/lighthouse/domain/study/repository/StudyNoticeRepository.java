package com.ssafy.lighthouse.domain.study.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.study.entity.StudyNotice;

public interface StudyNoticeRepository extends JpaRepository<StudyNotice, Integer> {
}
