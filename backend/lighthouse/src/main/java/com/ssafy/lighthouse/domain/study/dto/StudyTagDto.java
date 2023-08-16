package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.common.dto.TagDto;
import com.ssafy.lighthouse.domain.study.entity.StudyTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class StudyTagDto {
    private Long id;
    private int isValid;
    private Long studyId;
    private TagDto tag;

    public StudyTagDto(StudyTag studyTag) {
        this.id = studyTag.getId();
        this.isValid = studyTag.getIsValid();
        this.studyId = studyTag.getStudyId();
        this.tag = new TagDto(studyTag.getTag());
    }

    public StudyTag toEntity() {
        return StudyTag.builder()
                .id(this.id)
                .isValid(this.isValid)
                .studyId(this.studyId)
                .tag(this.tag.toEntity())
                .build();
    }
}
