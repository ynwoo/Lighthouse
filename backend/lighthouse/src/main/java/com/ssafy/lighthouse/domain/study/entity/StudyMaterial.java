package com.ssafy.lighthouse.domain.study.entity;

import javax.persistence.Entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyMaterial extends BaseEntity {
	private int studyId;
	private int sessionId;
	private int type;
	private String content;
	private String fileUrl;

	@Builder
	public StudyMaterial(int studyId, int sessionId, int type, String content, String fileUrl) {
		this.studyId = studyId;
		this.sessionId = sessionId;
		this.type = type;
		this.content = content;
		this.fileUrl = fileUrl;
	}

	public void update(int studyId, int sessionId, int type, String content, String fileUrl) {
		this.studyId = studyId;
		this.sessionId = sessionId;
		this.type = type;
		this.content = content;
		this.fileUrl = fileUrl;
	}
}
