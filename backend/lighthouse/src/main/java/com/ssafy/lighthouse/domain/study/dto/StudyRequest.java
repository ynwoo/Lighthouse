package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.common.dto.BadgeRequest;
import com.ssafy.lighthouse.domain.common.dto.BadgeResponse;
import com.ssafy.lighthouse.domain.common.dto.GugunDto;
import com.ssafy.lighthouse.domain.common.dto.SidoDto;
import com.ssafy.lighthouse.domain.study.entity.Study;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class StudyRequest {
    private Long id;
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
    private BadgeRequest badge;
    private SidoDto sido;
    private GugunDto gugun;
    private List<StudyTagDto> studyTags;
    private List<StudyEvalDto> studyEvals;
    private List<StudyNoticeDto.StudyNoticeReq> studyNotices;
    private List<SessionDto.SessionReq> sessions;

    public Study toEntity() {
        return Study.builder()
                .id(this.id)
                .isValid(isValid)
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
                .status(this.status)
                .studyTags(this.studyTags != null ? this.studyTags.stream().map(StudyTagDto::toEntity).collect(Collectors.toSet()) : new HashSet<>())
                .studyEvals(this.studyTags != null ? this.studyEvals.stream().map(StudyEvalDto::toEntity).collect(Collectors.toSet()) : new HashSet<>())
                .studyNotices(this.studyNotices != null ? this.studyNotices.stream().map(StudyNoticeDto.StudyNoticeReq::toEntity).collect(Collectors.toSet()) : new HashSet<>())
                .sessions(this.sessions != null ? this.sessions.stream().map(SessionDto.SessionReq::toEntity).collect(Collectors.toSet()) : new HashSet<>())
                .build();
    }
}