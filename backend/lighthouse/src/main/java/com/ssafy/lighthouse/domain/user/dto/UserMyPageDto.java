package com.ssafy.lighthouse.domain.user.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserMyPageDto {
	private String password;
	private String name;
	private String email;
	private String nickname;

	private String profileImgUrl;
	private int age;
	private Long sidoId;
	private Long gugunId;
	private String phoneNumber;
	private String description;
	List<String> userTagList;

	@Builder
	public UserMyPageDto(String password, String name, String email, String nickname, String profileImgUrl, int age,
						 Long sidoId, Long gugunId, String phoneNumber, String description, List<String> userTagList) {
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
}
