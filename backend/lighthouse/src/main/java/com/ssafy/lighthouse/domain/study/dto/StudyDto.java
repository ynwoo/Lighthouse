package com.ssafy.lighthouse.domain.study.dto;


import com.ssafy.lighthouse.domain.common.dto.GugunDto;
import com.ssafy.lighthouse.domain.common.dto.SidoDto;
import com.ssafy.lighthouse.domain.common.entity.Gugun;
import com.ssafy.lighthouse.domain.common.entity.Sido;
import com.ssafy.lighthouse.domain.study.entity.Study;
import com.ssafy.lighthouse.domain.study.entity.StudyEval;
import com.ssafy.lighthouse.domain.study.entity.StudyTag;
import com.ssafy.lighthouse.domain.user.entity.User;
import lombok.*;

import java.util.Set;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudyDto {
    private Long id;
    private String createdAt;
    private int isValid;
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
    private StudyDto original;
    private User leader;
    private SidoDto sido;
    private GugunDto gugun;
    private Set<StudyTag> studyTags;
    private Set<StudyEval> studyEvals;

    public StudyDto(Study study) {
        this.id = study.getId();
        this.createdAt = study.getCreatedAt();
        this.isValid = study.getIsValid();
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
        this.original = new StudyDto(study.getOriginal());
        this.leader = study.getLeader();
        this.sido = new SidoDto(study.getSido());
        this.gugun = new GugunDto(study.getGugun());
        this.studyTags = study.getStudyTags();
        this.studyEvals = study.getStudyEvals();
    }
}
