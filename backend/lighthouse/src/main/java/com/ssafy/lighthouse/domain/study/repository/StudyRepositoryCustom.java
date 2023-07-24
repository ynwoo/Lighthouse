package com.ssafy.lighthouse.domain.study.repository;


import com.ssafy.lighthouse.domain.study.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudyRepositoryCustom {
    Page<Study> findAll(Pageable pageable);
}
