package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.common.entity.Gugun;
import com.ssafy.lighthouse.domain.common.entity.Sido;
import com.ssafy.lighthouse.domain.user.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Study extends BaseEntity {
    private String title;
    private String description;
    private int hit;
    private String rule;
    private String startedAt;
    private String endedAt;
    private String recruitFinishedAt;
    private int maxMember;
    private int minMember;
    private int currentMember;
    private int isOnline;
    private int likeCnt;
    private int bookmarkCnt;

    // test용
    public Study(String title) {
        this.title = title;
    }

    // study 복제용 constructor
//    public Study(Study study) {
//        this.title = study.getTitle();
//        this.description = study.getDescription();
//        this.hit = study.getHit();
//        this.rule = study.getRule();
//        this.startedAt = study.getStartedAt();
//        this.endedAt = study.getEndedAt();
//        this.recruitFinishedAt = study.getRecruitFinishedAt();
//        this.maxMember = study.getMaxMember();
//        this.minMember = study.getMinMember();
//        this.currentMember = study.getCurrentMember();
//        this.isOnline = study.getIsOnline();
//        this.likeCnt = study.getLikeCnt();
//        this.bookmarkCnt = study.getBookmarkCnt();
//        this.original = study.getOriginal();
//        this.leader = study.getLeader();
////        this.sido = sido;
////        this.gugun = gugun;
////        this.studyTags = study.getStudyTags().stream().map(StudyTag::new).collect(Collectors.toSet());
////        this.studyEvals = study.getStudyEvals().stream().map(StudyEval::new).collect(Collectors.toSet());
//    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "originalId")
    private Study original;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leaderId")
    private User leader;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sidoId")
    private Sido sido;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gugunId")
    private Gugun gugun;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "studyId")
    private Set<StudyTag> studyTags;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "studyId")
    private Set<StudyEval> studyEvals;
}
