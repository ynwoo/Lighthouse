package com.ssafy.lighthouse.domain.study.entity;

import javax.persistence.Entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@ToString
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyMaterial extends BaseEntity {
	private Long studyId;
	private Long sessionId;
	private int type;
	private String content;
	private String fileUrl;

	public void update(Long studyId, Long sessionId, int type, String content, String fileUrl) {
		this.studyId = studyId;
		this.sessionId = sessionId;
		this.type = type;
		this.content = content;
		this.fileUrl = fileUrl;
	}

	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}
}
