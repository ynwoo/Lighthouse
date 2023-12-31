package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.common.entity.Badge;
import com.ssafy.lighthouse.global.util.LocalDateTime;
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
    private Long sidoId;
    private Long gugunId;
    private String coverImgUrl;
    public void share() {
        this.status = STATUS.SHARE; // share중인 상태
    }
    
    // hit 관리
    public void addHit() {this.hit++;}
    
    // like 관리
    public void addLike(){this.likeCnt++;}
    public void removeLike(){this.likeCnt--;}
    
    // bookmark 관리
    public void addBookmark(){this.bookmarkCnt++;}
    public void removeBookmark(){this.bookmarkCnt--;}

    public void addMember() {this.currentMember++;}
    public void removeMember() {this.currentMember--;}

    public void changeBadge(Badge badge) {this.badge = badge;}
    public void changeStatus(int status) {this.status = status;}

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
        this.startedAt = study.getStartedAt() != null ? study.getStartedAt() : LocalDateTime.now();
        this.endedAt = study.getEndedAt() != null ? study.getEndedAt() : LocalDateTime.now();
        this.recruitFinishedAt = study.getRecruitFinishedAt() != null ? study.getRecruitFinishedAt() : LocalDateTime.now();
        this.maxMember = study.getMaxMember();
        this.minMember = study.getMinMember();
        this.currentMember = study.getCurrentMember();
        this.isOnline = study.getIsOnline();
        this.likeCnt = study.getLikeCnt();
        this.bookmarkCnt = study.getBookmarkCnt();
        this.status = study.getStatus();
        this.sidoId = study.getSidoId();
        this.gugunId = study.getGugunId();
        this.coverImgUrl = study.getCoverImgUrl();
        this.badge = study.getBadge() != null ? study.getBadge() : this.badge;
    }
}
