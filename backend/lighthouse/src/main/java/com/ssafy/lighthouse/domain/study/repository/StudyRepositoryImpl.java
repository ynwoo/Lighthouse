package com.ssafy.lighthouse.domain.study.repository;


import com.querydsl.core.types.*;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.lighthouse.domain.common.entity.QBadge;
import com.ssafy.lighthouse.domain.study.dto.SimpleStudyDto;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;
import com.ssafy.lighthouse.domain.study.entity.Study;
import com.ssafy.lighthouse.domain.user.repository.UserRepository;
import com.ssafy.lighthouse.global.util.PAGE;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.lighthouse.domain.common.entity.QBadge.badge;
import static com.ssafy.lighthouse.domain.common.entity.QGugun.gugun;
import static com.ssafy.lighthouse.domain.common.entity.QSido.sido;
import static com.ssafy.lighthouse.domain.study.entity.QStudy.study;
import static com.ssafy.lighthouse.domain.study.entity.QStudyTag.studyTag;

@Repository
@Slf4j
@RequiredArgsConstructor
public class StudyRepositoryImpl implements StudyRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    private final UserRepository userRepository;

    @Override
    public Page<SimpleStudyDto> findAllByStudySearchOption(StudySearchOption options) {
        // 정렬 정보 가져오기
        OrderSpecifier<?> orderSpecifier = sortByOptions(options);

        // contents 구하기
        List<Study> studyList = jpaQueryFactory
                .select(study)
                .from(study)
                .leftJoin(study.studyTags, studyTag).on(studyTag.isValid.eq(1))
                .leftJoin(study.badge, badge).on(badge.isValid.eq(1))
                .where(
                        isValid(),
                        checkStatus(options),
                        isOnline(options),
                        checkByTagIds(options),
                        searchByKeyword(options))
                .groupBy(study)
                .orderBy(orderSpecifier)
                .offset(options.getOffset())
                .limit(options.getLimit())
                .fetch();

        List<SimpleStudyDto> contents = studyList.stream().map(study -> {
            SimpleStudyDto simpleStudyDto = new SimpleStudyDto(study);
            simpleStudyDto.setLeaderProfile(userRepository.findSimpleProfileByUserId(study.getLeaderId()));
            return simpleStudyDto;
        }).collect(Collectors.toList());

        // total 구하기
        Long total = jpaQueryFactory.select(study.count())
                .from(study)
                .where(
                        isValid(),
                        checkStatus(options),
                        isOnline(options),
                        checkByTagIds(options),
                        searchByKeyword(options))
                .fetchOne();
        if(total == null) total = 0L;
        log.debug("total : {}", total);

        // Page<SimpleStudyDto>로 변환
        Sort sort = Sort.by(orderSpecifier.isAscending() ? Sort.Direction.ASC : Sort.Direction.DESC,
                options.getOrderKey() == null ? "createdAt" : options.getOrderKey());
        PageRequest pageable = PageRequest.of(options.getPage(), PAGE.LIMIT, sort);
        return new PageImpl<>(contents, pageable, total);
    }
    
    // tag 일치 여부 확인
    private BooleanExpression checkByTagIds(StudySearchOption options) {
        return options.getTagIds() != null ? studyTag.tag.id.in(options.getTagIds()) : null;
    }

    // 유효한 스터디 인지 확인
    private BooleanExpression isValid() {
        return study.isValid.eq(1);
    }

    // 스터디 상태 일치 여부
    private BooleanExpression checkStatus(StudySearchOption options) {
        return study.status.eq(options.getStatus());
    }

    // 스터디 온라인 / 오프라인
    private BooleanExpression isOnline(StudySearchOption options) {
        return study.isOnline.eq(options.getIsOnline());
    }

    // 스터디 검색 (제목 ...)
    private BooleanExpression searchByKeyword(StudySearchOption options) {
        String key = options.getKey();
        String word = options.getWord();

        // key값이 없으면 null
        if(key == null) return null;

        if(key.equals("title")) {
            return study.title.contains(word);
        }
        return null;
    }
    
    // orderKey를 기준으로 orderBy
    private OrderSpecifier<?> sortByOptions(StudySearchOption options) {
        String orderKey = options.getOrderKey();
        String orderBy = options.getOrderBy();

        ComparableExpressionBase<?> result = null;
        
        // orderKey가 있는 경우
        if(orderKey != null) {
            switch (orderKey) {
                case "like":
                    result = study.likeCnt;
                    break;
                case "bookmark":
                    result = study.bookmarkCnt;
                    break;
            }
        }

        if(result != null) {
            // 적절한 orderKey가 있는 경우
            if(orderBy.equals("desc")) {
                return result.desc();
            } else {
                return result.asc();
            }
        }
        // 적절한 orderKey가 없으면 default로 createAt 순서로 정렬
        return study.createdAt != null ? study.createdAt.desc() : study.id.asc();
    }
}
