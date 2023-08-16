package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.study.entity.StudyEval;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StudyEvalDto {
    private Long id;
    private int isValid;
    private Long studyId;
    private Long userId;
    private String comment;
    private int score;

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public StudyEvalDto(StudyEval studyEval) {
        this.id = studyEval.getId();
        this.isValid = studyEval.getIsValid();
        this.studyId = studyEval.getStudyId();
        this.userId = studyEval.getUserId();
        this.comment = studyEval.getComment();
        this.score = studyEval.getScore();
    }

    public StudyEval toEntity() {
        return StudyEval.builder()
                .id(this.id)
                .isValid(this.isValid)
                .studyId(this.studyId)
                .userId(this.userId)
                .comment(this.comment)
                .score(this.score)
                .build();
    }
}
