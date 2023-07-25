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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Qna extends BaseEntity {
	private long userId;
	private long studyId;
	private String question;
	private String answer;

	@Builder
	public Qna(long userId, long studyId, String question, String answer) {
		this.userId = userId;
		this.studyId = studyId;
		this.question = question;
		this.answer = answer;
	}

	public void update(long userId, long studyId, String question, String answer) {
		this.userId = userId;
		this.studyId = studyId;
		this.question = question;
		this.answer = answer;
	}
}
