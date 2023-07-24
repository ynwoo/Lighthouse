package com.ssafy.lighthouse.domain.study.repository;


import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;
import com.ssafy.lighthouse.domain.study.entity.QStudy;
import com.ssafy.lighthouse.domain.study.entity.Study;
import com.ssafy.lighthouse.domain.user.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.lighthouse.domain.study.entity.QStudy.study;
import static com.ssafy.lighthouse.domain.study.entity.QStudyEval.studyEval;
import static com.ssafy.lighthouse.domain.study.entity.QStudyTag.studyTag;
import static com.ssafy.lighthouse.domain.user.entity.QUser.*;

@Repository
@RequiredArgsConstructor
public class StudyRepositoryImpl implements StudyRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Study> findAllByStudySearchOption(StudySearchOption options) {
        QStudy original = new QStudy("original");
        List<Study> studyList = jpaQueryFactory
                .select(study)
                .from(study)
                .leftJoin(study.original, original).fetchJoin()
                .leftJoin(study.leader, user).fetchJoin()
                .leftJoin(study.studyEvals, studyEval).fetchJoin()
                .leftJoin(study.studyTags, studyTag).fetchJoin()
                .where(
                        isOnline(options),
                        searchByKeyword(options))
                .orderBy(sortByOptions(options))
                .offset(options.getOffset())
                .limit(options.getLimit())
                .fetch();
        ;
        return studyList;
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

        NumberPath<?> result = null;
        
        // orderKey가 있는 경우
        if(orderKey != null) {
            if(orderKey.equals("like")) {
                result = study.likeCnt;
            } else if(orderKey.equals("bookmark")) {
                result = study.bookmarkCnt;
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
            return study.createdAt.desc();
        }
    }
}
