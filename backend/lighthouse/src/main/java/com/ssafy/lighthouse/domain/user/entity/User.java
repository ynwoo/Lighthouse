package com.ssafy.lighthouse.domain.user.entity;

import javax.persistence.Entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.user.dto.UserMyPageDto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(callSuper = true)
public class User extends BaseEntity {
	private String password;
	private String name;
	private String email;
	private String nickname;

	private String profileImgUrl;
	private Integer age;
	private Long sidoId;
	private Long gugunId;
	private String phoneNumber;
	private String description;
	private String token;
	private String providerId;
	//@OneToMany(mappedBy = "user")
	//private List<UserTag> userTags = new ArrayList<>();

	public void changeProfileImgUrl(String profileImgUrl) {this.profileImgUrl = profileImgUrl;}

	public void updateUserInfo(String password, String name, String nickname,
		String profileImgUrl, int age, Long sidoId, Long gugunId,
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

	public static User from(UserMyPageDto userMyPageDto) {
		return User.builder()
			.email(userMyPageDto.getEmail())
			.password(userMyPageDto.getPassword())
			.name(userMyPageDto.getName())
			.nickname(userMyPageDto.getNickname())
			.age(userMyPageDto.getAge())
			.sidoId(userMyPageDto.getSidoId())
			.gugunId(userMyPageDto.getGugunId())
			.phoneNumber(userMyPageDto.getPhoneNumber())
			.description(userMyPageDto.getDescription())
			//.userTags(userMyPageDto.getUserTagList())
			.build();
	}

	public void updateIsvalid() {
		recover();
	}
}
