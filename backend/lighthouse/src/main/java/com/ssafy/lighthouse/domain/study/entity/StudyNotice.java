package com.ssafy.lighthouse.domain.study.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
public class StudyNotice extends BaseEntity {
	private int studyId;
	private String content;

	@Builder
	public StudyNotice(int studyId, String content) {
		this.studyId = studyId;
		this.content = content;
	}

	public void update(int studyId, String content) {
		this.studyId = studyId;
		this.content = content;
	}
}
