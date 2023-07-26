package com.ssafy.lighthouse.domain.study.repository;


import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.QBean;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.lighthouse.domain.study.dto.SimpleStudyDto;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.lighthouse.domain.common.entity.QGugun.gugun;
import static com.ssafy.lighthouse.domain.common.entity.QSido.sido;
import static com.ssafy.lighthouse.domain.study.entity.QStudy.study;
import static com.ssafy.lighthouse.domain.study.entity.QStudyTag.studyTag;

@Repository
@RequiredArgsConstructor
public class StudyRepositoryImpl implements StudyRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<SimpleStudyDto> findAllByStudySearchOption(StudySearchOption options) {
        return jpaQueryFactory
                .select(Projections.constructor(SimpleStudyDto.class, study)).distinct()
                .from(study)
                .leftJoin(study.studyTags, studyTag)
                .leftJoin(study.sido, sido)
                .leftJoin(study.gugun, gugun)
                .where(
                        isOnline(options),
                        searchByKeyword(options))
                .orderBy(sortByOptions(options))
                .offset(options.getOffset())
                .limit(options.getLimit())
                .fetch();
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
        } else {
            // 적절한 orderKey가 없으면 default로 createAt 순서로 정렬
            return study.createdAt != null ? study.createdAt.desc() : null;
        }
    }
}
