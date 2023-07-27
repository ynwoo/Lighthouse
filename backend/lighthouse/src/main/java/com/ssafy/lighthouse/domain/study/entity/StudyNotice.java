package com.ssafy.lighthouse.domain.study.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.ssafy.lighthouse.domain.common.BaseEntity;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@ToString
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudyNotice extends BaseEntity {
	private Long studyId;
	private String content;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "studyNoticeId")
	private List<StudyNoticeCheck> studyNoticeChecks;
//
//	@Builder
//	public StudyNotice(Long studyId, String content) {
//		this.studyId = studyId;
//		this.content = content;
//	}

	public void update(Long studyId, String content) {
		this.studyId = studyId;
		this.content = content;
	}
}
