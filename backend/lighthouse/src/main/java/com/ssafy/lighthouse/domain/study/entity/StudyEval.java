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
    private int studyId;
    @NonNull
    private int userId;
    @NonNull
    private String comment;
    @NonNull
    private int score;
}
