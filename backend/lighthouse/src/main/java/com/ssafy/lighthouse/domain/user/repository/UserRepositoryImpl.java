package com.ssafy.lighthouse.domain.user.repository;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.lighthouse.domain.common.dto.TagDto;
import com.ssafy.lighthouse.domain.study.dto.SimpleStudyDto;
import com.ssafy.lighthouse.domain.study.entity.Study;
import com.ssafy.lighthouse.domain.study.repository.BookmarkRepository;
import com.ssafy.lighthouse.domain.study.repository.ParticipationHistoryRepository;
import com.ssafy.lighthouse.domain.user.dto.ProfileResponse;
import com.ssafy.lighthouse.domain.user.dto.SimpleProfileResponse;
import com.ssafy.lighthouse.domain.user.entity.QFollow;
import com.ssafy.lighthouse.global.util.STATUS;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.querydsl.jpa.JPAExpressions.select;
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
    public ProfileResponse findProfileByUserId(Long userId, Long loginId) {
        Set<Long> participatedSet = userId.equals(loginId) ? participationHistoryRepository.findStudyIdAllByUserId(userId, STATUS.PREPARING) :new HashSet<>();
        Set<Long> progressSet = participationHistoryRepository.findStudyIdAllByUserId(userId, STATUS.PROGRESS);
        Set<Long> terminatedSet = participationHistoryRepository.findStudyIdAllByUserId(userId, STATUS.TERMINATED);
        Set<Long> bookmarkSet = bookmarkRepository.findAllByUserId(userId);

        // all
        Set<Long> allStudyIdSet = new HashSet<>();
        allStudyIdSet.addAll(participatedSet);
        allStudyIdSet.addAll(progressSet);
        allStudyIdSet.addAll(terminatedSet);
        allStudyIdSet.addAll(bookmarkSet);

        Set<Long> tagSet = userTagRepository.findTagIdAllByUserId(userId);
        QFollow followee = new QFollow("followee");

        List<TagDto> tags = jpaQueryFactory.select(Projections.constructor(TagDto.class, tag)).from(tag).where(tag.id.in(tagSet), tag.isValid.eq(1)).fetch();
        List<Study> studyList = jpaQueryFactory.select(study).from(study).where(study.id.in(allStudyIdSet), study.isValid.eq(1)).fetch();
        List<SimpleStudyDto> participatedStudies = new ArrayList<>();
        List<SimpleStudyDto> progressStudies = new ArrayList<>();
        List<SimpleStudyDto> terminatedStudies = new ArrayList<>();
        List<SimpleStudyDto> bookmarkStudies = new ArrayList<>();

        studyList.forEach((study) -> {
            SimpleStudyDto simpleStudyDto = new SimpleStudyDto(study);
            // 진행중 스터디
            if(progressSet.contains(study.getId())) {
                progressStudies.add(simpleStudyDto);
            } 
            // 끝난 스터디
            else if(terminatedSet.contains(study.getId())) {
                terminatedStudies.add(simpleStudyDto);
            } 
            // 신청한 스터디
            else if (participatedSet.contains(study.getId())) {
                participatedStudies.add(simpleStudyDto);
            }

            // 북마크 한 스터디
            if(bookmarkSet.contains(study.getId())) {
                bookmarkStudies.add(simpleStudyDto);
            }
        });

        ProfileResponse result = jpaQueryFactory.select(Projections.fields(ProfileResponse.class,
                        user.id,
                        user.isValid,
                        user.nickname,
                        user.profileImgUrl,
                        user.description,
                        ExpressionUtils.as(select(userEval.score.avg()).from(userEval).where(userEval.userId.eq(userId), userEval.isValid.eq(1)), "score"),
                        ExpressionUtils.as(select(follow.followeeId.count()).from(follow).where(follow.followerId.eq(userId), follow.isValid.eq(1)), "following"),
                        ExpressionUtils.as(select(followee.followerId.count()).from(followee).where(followee.followeeId.eq(userId), followee.isValid.eq(1)), "follower")))
                .from(user)
                .where(user.id.eq(userId), user.isValid.eq(1))
                .fetchOne();


        return ProfileResponse.builder()
                .id(result.getId())
                .isValid(result.getIsValid())
                .nickname(result.getNickname())
                .profileImgUrl(result.getProfileImgUrl())
                .description(result.getDescription())
                .tags(tags)
                .participatedStudies(participatedStudies)
                .progressStudies(progressStudies)
                .terminatedStudies(terminatedStudies)
                .bookmarkStudies(bookmarkStudies)
                .score(result.getScore())
                .following(result.getFollowing())
                .follower(result.getFollower())
                .build();
    }

    @Override
    public SimpleProfileResponse findSimpleProfileByUserId(Long userId) {
        SimpleProfileResponse result = jpaQueryFactory.select(Projections.fields(SimpleProfileResponse.class,
                        user.id,
                        user.isValid,
                        user.nickname,
                        user.profileImgUrl,
                        user.description,
                        ExpressionUtils.as(select(userEval.score.avg()).from(userEval).where(userEval.userId.eq(userId), userEval.isValid.eq(1)), "score")))
                .from(user)
                .where(user.id.eq(userId), user.isValid.eq(1))
                .fetchOne();

        Set<Long> tagSet = userTagRepository.findTagIdAllByUserId(userId);
        List<TagDto> tags = jpaQueryFactory.select(Projections.constructor(TagDto.class, tag)).from(tag).where(tag.id.in(tagSet), tag.isValid.eq(1)).fetch();


        return SimpleProfileResponse.builder()
                .id(result.getId())
                .isValid(result.getIsValid())
                .nickname(result.getNickname())
                .profileImgUrl(result.getProfileImgUrl())
                .description(result.getDescription())
                .tags(tags)
                .score(result.getScore())
                .build();
    }
}
