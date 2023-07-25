package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.common.entity.Tag;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor // test용
public class StudyTag extends BaseEntity {
    private Long studyId;
    private Long tagId;

    public StudyTag(StudyTag studyTag) {
        this.studyId = studyTag.getStudyId();
        this.tag = studyTag.getTag();
    }
}
