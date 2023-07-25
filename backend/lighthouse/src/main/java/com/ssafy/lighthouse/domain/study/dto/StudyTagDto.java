package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.study.entity.StudyTag;
import lombok.*;

@Getter
@NoArgsConstructor
public class StudyTagDto {
    private Long studyId;
    private Long tagId;
//    private TagDto tag;

    public StudyTagDto(StudyTag studyTag) {
        this.studyId = studyTag.getStudyId();
        this.tagId = studyTag.getTagId();
    }
}
