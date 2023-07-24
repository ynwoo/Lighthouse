package com.ssafy.lighthouse.domain.user.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.lighthouse.domain.common.BaseEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserTag extends BaseEntity {
	private int userId;
	private int tagId;

	public UserTag(int userId, int tagId) {
		this.userId = userId;
		this.tagId = tagId;
	}

	public void updateUserTagInfo(int userId, int tagId) {
		this.userId = userId;
		this.tagId = tagId;
	}
}
