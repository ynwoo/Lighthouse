package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class SessionCheck extends BaseEntity {
	private Long userId;
	private Long sessionId;
	private String content;

	public void update(Long userId, Long sessionId, String content) {
		this.userId = userId;
		this.sessionId = sessionId;
		this.content = content;
	}
}
