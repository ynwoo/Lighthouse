package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.study.entity.StudyNotice;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
public class StudyNoticeDto {
	private int studyId;
	private String content;

	@Builder
	public StudyNoticeDto(int studyId, String content) {
		this.studyId = studyId;
		this.content = content;
	}

	public StudyNotice toEntity() {
		return StudyNotice.builder()
				.studyId(studyId)
				.content(content)
				.build();
	}
}
