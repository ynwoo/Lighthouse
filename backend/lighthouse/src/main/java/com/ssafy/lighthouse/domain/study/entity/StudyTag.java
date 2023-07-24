package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RequiredArgsConstructor
public class StudyTag extends BaseEntity {
    @NonNull
    private int studyId;
    @NonNull
    private int tagId;

    public StudyTag(StudyTag studyTag) {
        this.studyId = studyTag.getStudyId();
        this.tagId = studyTag.getTagId();
    }
}
