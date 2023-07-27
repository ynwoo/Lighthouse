package com.ssafy.lighthouse.domain.study.dto;


import com.ssafy.lighthouse.domain.common.dto.GugunDto;
import com.ssafy.lighthouse.domain.common.dto.SidoDto;
import com.ssafy.lighthouse.domain.study.dto.SessionDto.SessionReq;
import com.ssafy.lighthouse.domain.study.dto.SessionDto.SessionRes;
import com.ssafy.lighthouse.domain.study.entity.Study;
import com.ssafy.lighthouse.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

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
    private User leader;    // 수정 필요
    private SidoDto sido;
    private GugunDto gugun;
    private List<StudyTagDto> studyTags;
    private List<StudyEvalDto> studyEvals;
    private List<StudyNoticeDto.StudyNoticeRes> studyNotices;
    private List<StudyMaterialDto.Res> studyMaterials;
    private List<SessionRes> sessions;

    public void share() {
    }

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
        this.original = study.getOriginal() == null ? null : new StudyDto(study.getOriginal());
        this.leader = study.getLeader();
        this.sido = study.getSido() == null ? null : new SidoDto(study.getSido());
        this.gugun = study.getGugun() == null ? null : new GugunDto(study.getGugun());
        this.studyTags = study.getStudyTags() == null ? null : study.getStudyTags().stream().map(StudyTagDto::new).collect(Collectors.toList());
        this.studyEvals = study.getStudyEvals() == null ? null : study.getStudyEvals().stream().map(StudyEvalDto::new).collect(Collectors.toList());
        this.studyMaterials = study.getStudyMaterials() == null ? null : study.getStudyMaterials().stream().map(StudyMaterialDto.Res::new).collect(Collectors.toList());
        this.studyNotices = study.getStudyNotices() == null ? null : study.getStudyNotices().stream().map(StudyNoticeDto.StudyNoticeRes::new).collect(Collectors.toList());
        this.sessions = study.getSessions() == null ? null : study.getSessions().stream().map(SessionRes::new).collect(Collectors.toList());
    }
}
