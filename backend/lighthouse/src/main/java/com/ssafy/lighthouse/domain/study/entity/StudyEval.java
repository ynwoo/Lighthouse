package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RequiredArgsConstructor
public class StudyEval extends BaseEntity {
    @NonNull
    private Long studyId;
    @NonNull
    private Long userId;
    @NonNull
    private String comment;
    @NonNull
    private int score;

    public StudyEval(StudyEval studyEval) {
        this.studyId = studyEval.getStudyId();
        this.userId = studyEval.getUserId();
        this.comment = studyEval.getComment();
        this.score = studyEval.getScore();
    }
}
