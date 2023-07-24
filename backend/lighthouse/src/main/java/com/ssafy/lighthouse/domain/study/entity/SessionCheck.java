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
public class SessionCheck extends BaseEntity {
	private int userId;
	private int sessionId;
	private String content;

	@Builder
	public SessionCheck(int userId, int sessionId, String content) {
		this.userId = userId;
		this.sessionId = sessionId;
		this.content = content;
	}
}
