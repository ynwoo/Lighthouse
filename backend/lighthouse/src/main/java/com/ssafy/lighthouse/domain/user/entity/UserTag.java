package com.ssafy.lighthouse.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.lighthouse.domain.common.entity.Tag;
import javax.persistence.Entity;
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
	//private int userId;
	//private int tagId;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "tag_id")
	private Tag tag;
	public UserTag(int userId, int tagId) {
		//this.userId = userId;
		//this.tagId = tagId;
	}

	public void updateUserTagInfo(int userId, int tagId) {
		//this.userId = userId;
		//this.tagId = tagId;
	}
}
