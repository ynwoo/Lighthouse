package com.ssafy.lighthouse.domain.study.dto;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.lighthouse.domain.study.entity.StudyMaterial;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class StudyMaterialDto {
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class Req {
		private Long id;
		private int isValid;
		private Long studyId;
		private Long sessionId;
		private int type;
		private String content;
		private String fileUrl;
		private MultipartFile file;

		public StudyMaterial toEntity() {
			return StudyMaterial.builder()
					.id(id)
					.isValid(isValid)
				.studyId(studyId)
				.sessionId(sessionId)
				.type(type)
				.content(content)
				.build();
		}
	}

	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class Res {
		private Long id;
		private int isValid;
		private String createdAt;
		private Long studyId;
		private Long sessionId;
		private int type;
		private String content;
		private String fileUrl;

		public Res(StudyMaterial studyMaterial) {
			this.id = studyMaterial.getId();
			this.isValid = studyMaterial.getIsValid();
			this.createdAt = studyMaterial.getCreatedAt();
			this.studyId = studyMaterial.getStudyId();
			this.sessionId = studyMaterial.getSessionId();
			this.type = studyMaterial.getType();
			this.content = studyMaterial.getContent();
			this.fileUrl = studyMaterial.getFileUrl();
		}
	}
}
