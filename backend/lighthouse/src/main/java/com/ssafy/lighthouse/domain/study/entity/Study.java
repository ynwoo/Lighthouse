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
