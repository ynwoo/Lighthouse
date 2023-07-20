package com.ssafy.lighthouse.domain.study.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class StudyNoticeCheck {
	@Id
	@GeneratedValue
	private Integer id;
	private String createdAt;
	private Integer isValid;
	private int userId;
	private int studyNoticeId;
}
