package com.ssafy.lighthouse.domain.user.repository;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.lighthouse.domain.common.dto.TagDto;
import com.ssafy.lighthouse.domain.common.entity.QTag;
import com.ssafy.lighthouse.domain.study.dto.SimpleStudyDto;
import com.ssafy.lighthouse.domain.study.entity.QStudy;
import com.ssafy.lighthouse.domain.study.repository.BookmarkRepository;
import com.ssafy.lighthouse.domain.study.repository.ParticipationHistoryRepository;
import com.ssafy.lighthouse.domain.user.dto.ProfileResponse;
import com.ssafy.lighthouse.domain.user.entity.QFollow;
import com.ssafy.lighthouse.domain.user.entity.QUserEval;
import com.ssafy.lighthouse.global.util.STATUS;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.querydsl.jpa.JPAExpressions.select;
import static com.querydsl.jpa.JPAExpressions.selectFrom;
import static com.ssafy.lighthouse.domain.common.entity.QTag.tag;
import static com.ssafy.lighthouse.domain.study.entity.QStudy.study;
import static com.ssafy.lighthouse.domain.user.entity.QFollow.follow;
import static com.ssafy.lighthouse.domain.user.entity.QUser.user;
import static com.ssafy.lighthouse.domain.user.entity.QUserEval.userEval;

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;
    private final ParticipationHistoryRepository participationHistoryRepository;
    private final BookmarkRepository bookmarkRepository;
    private final UserTagRepository userTagRepository;

    @Override
    public ProfileResponse findProfileByUserId(Long userId) {
        // list 세 개를 한번에 가져오는 최적화 가능
        List<Long> progressList = participationHistoryRepository.findStudyIdAllByUserId(userId, STATUS.PROGRESS);
        List<Long> terminatedList = participationHistoryRepository.findStudyIdAllByUserId(userId, STATUS.TERMINATED);
        List<Long> bookmarkList = bookmarkRepository.findAllByUserId(userId);
        List<Long> tagList = userTagRepository.findTagIdAllByUserId(userId);
        QStudy progress = new QStudy("progress");
        QStudy terminated = new QStudy("terminated");
        QStudy bookmark = new QStudy("bookmark");
        QFollow followee = new QFollow("followee");

//        return jpaQueryFactory.select(Projections.fields(ProfileResponse.class,
//                        user.nickname,
//                        user.profileImgUrl,
//                        user.description,
////                        ExpressionUtils.as(select(Projections.constructor(TagDto.class, tag)).from(tag).where(tag.id.in(tagList), tag.isValid.eq(1)), "tags"),
//                        ExpressionUtils.as(select(Projections.constructor(SimpleStudyDto.class, progress)).from(progress).where(progress.id.in(progressList), progress.isValid.eq(1)), "studies"),
//                        ExpressionUtils.as(select(Projections.constructor(SimpleStudyDto.class, terminated)).from(terminated).where(terminated.id.in(terminatedList), terminated.isValid.eq(1)), "participatedStudies"),
//                        ExpressionUtils.as(select(Projections.constructor(SimpleStudyDto.class, bookmark)).from(bookmark).where(bookmark.id.in(bookmarkList), bookmark.isValid.eq(1)), "bookmarkStudies"),
//                        ExpressionUtils.as(select(userEval.score.avg()).from(userEval).where(userEval.userId.eq(user.id), userEval.isValid.eq(1)), "score"),
//                        ExpressionUtils.as(select(follow.followeeId.count()).from(follow).where(follow.followerId.eq(user.id), follow.isValid.eq(1)), "following"),
//                        ExpressionUtils.as(select(followee.followerId.count()).from(followee).where(followee.followeeId.eq(user.id), followee.isValid.eq(1)), "follower")))
//                .from(user)
//                .fetchOne();

        return jpaQueryFactory.select(Projections.constructor(ProfileResponse.class,
                        user.nickname,
                        user.profileImgUrl,
                        user.description,
                        selectFrom(tag).where(tag.id.in(tagList), tag.isValid.eq(1)),
                        selectFrom(progress).where(progress.id.in(progressList), progress.isValid.eq(1)),
                        selectFrom(terminated).where(terminated.id.in(terminatedList), terminated.isValid.eq(1)),
                        selectFrom(bookmark).where(bookmark.id.in(bookmarkList), bookmark.isValid.eq(1)),
                        select(userEval.score.avg()).from(userEval).where(userEval.userId.eq(user.id), userEval.isValid.eq(1)),
                        select(follow.followeeId.count()).from(follow).where(follow.followerId.eq(user.id), follow.isValid.eq(1)),
                        select(followee.followerId.count()).from(followee).where(followee.followeeId.eq(user.id), followee.isValid.eq(1))))
                .from(user)
                .fetchOne();
    }
}
