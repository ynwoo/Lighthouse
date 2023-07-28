package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;
import java.util.Set;

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
	private Set<StudyNoticeCheck> studyNoticeChecks;

	public void update(Long studyId, String content) {
		this.studyId = studyId;
		this.content = content;
	}
}
