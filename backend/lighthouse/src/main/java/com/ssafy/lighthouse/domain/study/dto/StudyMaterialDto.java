package com.ssafy.lighthouse.domain.study.dto;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.lighthouse.domain.common.util.S3Utils;
import com.ssafy.lighthouse.domain.study.entity.StudyMaterial;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

public class StudyMaterialDto {
	private static final String CATEGORY = "StudyMaterials";
	@Getter
	@Setter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	@ToString
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
			if (file != null && !file.isEmpty()) {
				return StudyMaterial.builder()
					.id(id)
					.isValid(isValid)
					.studyId(studyId)
					.sessionId(sessionId)
					.type(type)
					.content(content)
					.fileUrl(S3Utils.uploadFile(CATEGORY, file))
					.build();
			}
			return StudyMaterial.builder()
				.id(id)
				.isValid(isValid)
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
