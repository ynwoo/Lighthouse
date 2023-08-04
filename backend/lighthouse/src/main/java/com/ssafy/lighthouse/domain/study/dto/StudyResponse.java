package com.ssafy.lighthouse.domain.study.dto;


import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.common.dto.BadgeDto;
import com.ssafy.lighthouse.domain.common.dto.GugunDto;
import com.ssafy.lighthouse.domain.common.dto.SidoDto;
import com.ssafy.lighthouse.domain.study.dto.SessionDto.SessionRes;
import com.ssafy.lighthouse.domain.study.entity.ParticipationHistory;
import com.ssafy.lighthouse.domain.study.entity.Study;
import com.ssafy.lighthouse.domain.user.dto.SimpleProfileResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudyResponse {
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
    private int status;
    private BadgeDto badge;
    private StudyResponse original;
    private SimpleProfileResponse leaderProfile;
    private List<SimpleProfileResponse> memberProfiles;
    private SidoDto sido;
    private GugunDto gugun;
    private List<StudyTagDto> studyTags;
    private List<StudyEvalDto> studyEvals;
    private List<StudyNoticeDto.StudyNoticeRes> studyNotices;
    private List<SessionRes> sessions;
    private List<QnaDto.Res> qnas;

    public void setLeaderProfile(SimpleProfileResponse leaderProfile) {
        this.leaderProfile = leaderProfile;
    }

    public void setMemberProfiles(List<SimpleProfileResponse> memberProfiles) {
        this.memberProfiles = memberProfiles;
    }

    public StudyResponse(Study study) {
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
        this.status = study.getStatus();
        this.badge = study.getBadge() != null ? new BadgeDto(study.getBadge()) : null;
        this.original = study.getOriginal() != null ? new StudyResponse(study.getOriginal()) : null;
        this.sido = study.getSido() != null ? new SidoDto(study.getSido()) : null;
        this.gugun = study.getGugun() != null ? new GugunDto(study.getGugun()) : null;
        this.studyTags = study.getStudyTags() != null ? study.getStudyTags().stream().filter(BaseEntity::isValid).map(StudyTagDto::new).collect(Collectors.toList()) : null;
        this.studyEvals = study.getStudyEvals() != null ? study.getStudyEvals().stream().filter(BaseEntity::isValid).map(StudyEvalDto::new).collect(Collectors.toList()) : null;
        this.studyNotices = study.getStudyNotices() != null ? study.getStudyNotices().stream().filter(BaseEntity::isValid).map(StudyNoticeDto.StudyNoticeRes::new).collect(Collectors.toList()) : null;
        this.sessions = study.getSessions() != null ? study.getSessions().stream().filter(BaseEntity::isValid).map(SessionRes::new).collect(Collectors.toList()) : null;
        this.qnas = study.getQnas() != null ? study.getQnas().stream().filter(BaseEntity::isValid).map(QnaDto.Res::new).collect(Collectors.toList()) : null;
    }


}
