package com.ssafy.lighthouse.domain.study.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.lighthouse.domain.study.entity.Study;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
public class StudyRepositoryImpl implements StudyRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<Study> findAll(Pageable pageable) {
//        jpaQueryFactory
//                .select()
        return null;
    }
}
