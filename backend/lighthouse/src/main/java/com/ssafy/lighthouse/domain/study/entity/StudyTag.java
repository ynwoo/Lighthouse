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
public class StudyTag extends BaseEntity {
    private Long studyId;
    private Long tagId;

    public StudyTag(StudyTag studyTag) {
        this.studyId = studyTag.getStudyId();
        this.tagId = studyTag.getTagId();
    }
}
