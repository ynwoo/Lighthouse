package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.study.entity.StudyMaterial;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class StudyMaterialDto {
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class Req {
		private Long studyId;
		private Long sessionId;
		private int type;
		private String content;
		private String fileUrl;

		@Builder
		public Req(Long studyId, Long sessionId, int type, String content, String fileUrl) {
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

	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class Res {
		private Long id;
		private String createdAt;
		private Long studyId;
		private Long sessionId;
		private int type;
		private String content;
		private String fileUrl;

		public Res(StudyMaterial studyMaterial) {
			this.id = studyMaterial.getId();
			this.createdAt = studyMaterial.getCreatedAt();
			this.studyId = studyMaterial.getStudyId();
			this.sessionId = studyMaterial.getSessionId();
			this.type = studyMaterial.getType();
			this.content = studyMaterial.getContent();
			this.fileUrl = studyMaterial.getFileUrl();
		}
	}
}
