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
public class StudyNoticeCheck extends BaseEntity {
	private int userId;
	private int studyNoticeId;

	@Builder
	public StudyNoticeCheck(int userId, int studyNoticeId) {
		this.userId = userId;
		this.studyNoticeId = studyNoticeId;
	}
}
