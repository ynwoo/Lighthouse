package com.ssafy.lighthouse.domain.user.entity;

import javax.persistence.Entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserTag extends BaseEntity {
	private Long userId;
	private Long tagId;

	@Builder
	public UserTag(Long userId, Long tagId) {
		this.userId = userId;
		this.tagId = tagId;
	}

	public void updateUserTagInfo(Long userId, Long tagId) {
		this.userId = userId;
		this.tagId = tagId;
	}

	public static UserTag from(Long id, Long tagId) {
		return UserTag.builder()
			.userId(id)
			.tagId(tagId)
			.build();
	}
}
