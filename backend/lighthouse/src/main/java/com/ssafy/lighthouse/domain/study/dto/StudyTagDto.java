package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.study.entity.StudyTag;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StudyTagDto {
    private Long id;
    private int isValid;
    private Long studyId;
    private Long tagId;
//    private TagDto tag;

    public StudyTagDto(StudyTag studyTag) {
        this.id = studyTag.getId();
        this.studyId = studyTag.getStudyId();
        this.tagId = studyTag.getTagId();
    }

    public StudyTag toEntity() {
        return StudyTag.builder()
                .id(this.id)
                .isValid(this.isValid)
                .studyId(this.studyId)
                .tagId(this.tagId)
                .build();
    }
}
