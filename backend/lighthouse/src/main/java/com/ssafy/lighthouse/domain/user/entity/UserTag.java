package com.ssafy.lighthouse.domain.user.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.ssafy.lighthouse.domain.common.BaseEntity;

import com.ssafy.lighthouse.domain.common.entity.Tag;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserTag extends BaseEntity {
	private Long userId;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "tagId")
	private Tag tag;

	public void setUserId(Long userId) {
		this.userId = userId;
	}

//	public void updateUserTagInfo(Long userId, Long tagId) {
//		this.userId = userId;
//		this.tag = tagId;
//	}

//	public static UserTag from(Long id, Long tagId) {
//		return UserTag.builder()
//			.userId(id)
//			.tagId(tagId)
//			.build();
//	}
}
