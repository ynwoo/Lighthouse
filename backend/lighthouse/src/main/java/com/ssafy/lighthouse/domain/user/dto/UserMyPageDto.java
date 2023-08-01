package com.ssafy.lighthouse.domain.user.dto;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.lighthouse.domain.common.dto.TagDto;
import com.ssafy.lighthouse.domain.user.entity.User;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@ToString
public class UserMyPageDto {
	private Long id;
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
	List<TagDto> userTagList;

	public static UserMyPageDto from(User user) {
		return UserMyPageDto.builder()
			.id(user.getId())
			.name(user.getName())
			.email(user.getEmail())
			.nickname(user.getNickname())
			.profileImgUrl(user.getProfileImgUrl())
			.age(user.getAge())
			.sidoId(user.getSidoId())
			.gugunId(user.getGugunId())
			.phoneNumber(user.getPhoneNumber())
			.description(user.getDescription())
			.userTagList(new ArrayList<>())
			.build();
	}
}
