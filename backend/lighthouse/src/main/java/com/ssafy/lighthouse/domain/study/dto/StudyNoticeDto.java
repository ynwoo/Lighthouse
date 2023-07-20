package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.study.entity.StudyNotice;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StudyNoticeDto {
	private int studyID;
	private String content;

	public StudyNotice toEntity() {
		return StudyNotice.builder()
				.studyId(studyID)
				.content(content)
				.build();
	}
}
