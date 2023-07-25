package com.ssafy.lighthouse.domain.study.dto;


import com.ssafy.lighthouse.domain.common.dto.GugunDto;
import com.ssafy.lighthouse.domain.common.dto.SidoDto;
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
    private User leader;
    private SidoDto sido;
    private GugunDto gugun;
    private List<StudyTagDto> studyTagDtos;
    private List<StudyEvalDto> studyEvalDtos;
    private List<StudyNoticeDto> studyNoticeDtos;
    private List<StudyMaterialDto> studyMaterialDtos;
    private List<SessionDto> sessionDtos;

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
        this.studyTagDtos = study.getStudyTags() == null ? null : study.getStudyTags().stream().map(StudyTagDto::new).collect(Collectors.toList());
        this.studyEvalDtos = study.getStudyEvals() == null ? null : study.getStudyEvals().stream().map(StudyEvalDto::new).collect(Collectors.toList());
//        this.studyMaterialDtos = study.getStudyMaterial() == null ? null : study.getStudyMaterial().stream().map(StudyMaterialDto::new).collect(Collectors.toList());
//        this.studyNoticeDtos = study.getStudyNotice() == null ? null : study.getStudyNotice().stream().map(StudyNoticeDto::new).collect(Collectors.toList());
//        this.sessionDtos = study.getSession() == null ? null : study.getSession().stream().map(SessionDto::new).collect(Collectors.toList());
    }

    public Study toEntity() {
        return Study.builder()
                .title(this.title)
                .description(this.description)
                .hit(this.hit)
                .rule(this.rule)
                .startedAt(this.startedAt)
                .endedAt(this.endedAt)
                .recruitFinishedAt(this.recruitFinishedAt)
                .maxMember(this.maxMember)
                .minMember(this.minMember)
                .currentMember(this.currentMember)
                .isOnline(this.isOnline)
                .likeCnt(this.likeCnt)
                .bookmarkCnt(this.bookmarkCnt)
                .original(this.original != null ? this.original.toEntity() : null)
//                .leader(this.leader.toEntity())
                .studyTags(this.studyTagDtos != null ? this.studyTagDtos.stream().map(StudyTagDto::toEntity).collect(Collectors.toSet()) : null)
                .studyEvals(this.studyTagDtos != null ? this.studyEvalDtos.stream().map(StudyEvalDto::toEntity).collect(Collectors.toSet()) : null)
//                .studyMaterials(this.studyMaterialDtos.stream().map(StudyMaterialDto::toEntity).collect(Collectors.toSet()))
//                .studyNotices(this.studyNoticeDtos.stream().map(StudyNoticeDto::toEntity).collect(Collectors.toSet()))
//                .sessions(this.sessionDtos.stream().map(SessionDto::toEntity).collect(Collectors.toSet()))
                .build();
    }
}
