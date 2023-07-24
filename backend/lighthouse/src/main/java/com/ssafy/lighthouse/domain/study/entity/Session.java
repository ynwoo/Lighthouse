package com.ssafy.lighthouse.domain.study.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

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
public class Session extends BaseEntity {
	private String startedAt;
	private String endedAt;
	private int studyId;
	private String title;
	private String description;
	private String comment;
	private int status;
	private int seqNum;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "sessionId")
	private List<StudyMaterial> studyMaterials;

	@Builder
	public Session(String startedAt, String endedAt, int studyId, String title, String description,
		String comment, int status, int seqNum) {
		this.startedAt = startedAt;
		this.endedAt = endedAt;
		this.studyId = studyId;
		this.title = title;
		this.description = description;
		this.comment = comment;
		this.status = status;
		this.seqNum = seqNum;
	}

	public void update(String startedAt, String endedAt, int studyId, String title, String description,
		String comment, int status, int seqNum) {
		this.startedAt = startedAt;
		this.endedAt = endedAt;
		this.studyId = studyId;
		this.title = title;
		this.description = description;
		this.comment = comment;
		this.status = status;
		this.seqNum = seqNum;
	}
}


