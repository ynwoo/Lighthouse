package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Entity
@Getter
@ToString
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyEval extends BaseEntity {
    private Long studyId;
    private Long userId;
    private String comment;
    private int score;

    public StudyEval(StudyEval studyEval) {
        this.studyId = studyEval.getStudyId();
        this.userId = studyEval.getUserId();
        this.comment = studyEval.getComment();
        this.score = studyEval.getScore();
    }
}
