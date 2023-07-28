package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.common.dto.GugunDto;
import com.ssafy.lighthouse.domain.common.dto.SidoDto;
import com.ssafy.lighthouse.domain.study.entity.Study;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class SimpleStudyDto {
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
    private SidoDto sido;
    private GugunDto gugun;
    private List<StudyTagDto> studyTags;

    public SimpleStudyDto(Study study) {
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
        this.sido = study.getSido() == null ? null : new SidoDto(study.getSido());
        this.gugun = study.getGugun() == null ? null : new GugunDto(study.getGugun());
        this.studyTags = study.getStudyTags() == null ? null : study.getStudyTags().stream().filter(BaseEntity::isValid).map(StudyTagDto::new).collect(Collectors.toList());
    }
}
