package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.study.entity.StudyMaterial;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class StudyMaterialDto {
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class StudyMaterialReq {
		private int studyId;
		private int sessionId;
		private int type;
		private String content;
		private String fileUrl;

		@Builder
		public StudyMaterialReq(int studyId, int sessionId, int type, String content, String fileUrl) {
			this.studyId = studyId;
			this.sessionId = sessionId;
			this.type = type;
			this.content = content;
			this.fileUrl = fileUrl;
		}

		public StudyMaterial toEntity() {
			return StudyMaterial.builder()
				.studyId(studyId)
				.sessionId(sessionId)
				.type(type)
				.content(content)
				.fileUrl(fileUrl)
				.build();
		}
	}
}
