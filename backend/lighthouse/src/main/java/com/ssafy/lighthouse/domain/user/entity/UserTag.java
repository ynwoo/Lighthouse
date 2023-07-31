package com.ssafy.lighthouse.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.lighthouse.domain.common.entity.Tag;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.user.dto.UserMyPageDto;

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

	// @ManyToOne
	// @JsonIgnore
	// @JoinColumn(name = "user_id")
	// private User user;
	//
	// @ManyToOne
	// @JsonIgnore
	// @JoinColumn(name = "tag_id")
	// private Tag tag;

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
