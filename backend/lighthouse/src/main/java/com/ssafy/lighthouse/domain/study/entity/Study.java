package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.common.entity.Badge;
import com.ssafy.lighthouse.domain.common.entity.Gugun;
import com.ssafy.lighthouse.domain.common.entity.Sido;
import com.ssafy.lighthouse.global.util.STATUS;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@SuperBuilder
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
    private int status;
    private Long leaderId;
    private Long originalId;
    public void share() {
        this.status = STATUS.SHARE; // share중인 상태
    }
    
    // like 관리
    public void addLike(){this.likeCnt++;}
    public void removeLike(){this.likeCnt--;}
    
    // bookmark 관리
    public void addBookmark(){this.bookmarkCnt++;}
    public void removeBookmark(){this.bookmarkCnt--;}

    public void addMember() {this.currentMember++;}
    public void removeMember() {this.currentMember--;}

    public void changeBadge(Badge badge) {this.badge = badge;}

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sidoId")
    private Sido sido;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gugunId")
    private Gugun gugun;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "badgeId")
    private Badge badge;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "studyId")
    private Set<StudyTag> studyTags;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "studyId")
    private Set<StudyEval> studyEvals;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "studyId")
    private Set<StudyNotice> studyNotices;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "studyId")
    private Set<Session> sessions;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "studyId", updatable = false)
    private Set<Qna> qnas;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "studyId", updatable = false)
    private Set<ParticipationHistory> participations;

    public void update(Study study) {
        this.title = study.getTitle();
        this.description = study.getDescription();
        this.hit = study.getHit();
        this.rule = study.getRule();
        this.startedAt = study.getStartedAt();
        this.endedAt = study.getEndedAt();
        this.recruitFinishedAt = study.getRecruitFinishedAt();
        this.maxMember = study.getMaxMember();
        this.minMember = study.getMinMember();
        this.currentMember = study.getCurrentMember();
        this.isOnline = study.getIsOnline();
        this.likeCnt = study.getLikeCnt();
        this.bookmarkCnt = study.getBookmarkCnt();
        this.status = study.getStatus();
    }
}
