package com.ssafy.lighthouse.domain.user.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.ssafy.lighthouse.domain.common.BaseEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(callSuper = true)
public class User extends BaseEntity {

	private String password;
	private String name;
	private String email;
	private String nickname;

	private String profileImgUrl;
	private int age;
	private int sidoId;
	private int gugunId;
	private String phoneNumber;
	private String description;

	// @OneToMany()
	// List<UserTag> userTags = new ArrayList<>();

	public User(String password, String name, String email, String nickname,
		String profileImgUrl, int age, int sidoId, int gugunId,
		String phoneNumber, String description) {
		this.password = password;
		this.name = name;
		this.email = email;
		this.nickname = nickname;
		this.profileImgUrl = profileImgUrl;
		this.age = age;
		this.sidoId = sidoId;
		this.gugunId = gugunId;
		this.phoneNumber = phoneNumber;
		this.description = description;
	}

	public void updateUserInfo(String password, String name, String nickname,
		String profileImgUrl, int age, int sidoId, int gugunId,
		String phoneNumber, String description) {
		this.password = password;
		this.name = name;
		this.nickname = nickname;
		this.profileImgUrl = profileImgUrl;
		this.age = age;
		this.sidoId = sidoId;
		this.gugunId = gugunId;
		this.phoneNumber = phoneNumber;
		this.description = description;
	}
}
