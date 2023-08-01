package com.ssafy.lighthouse.domain.user.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.lighthouse.domain.common.dto.TagDto;
import com.ssafy.lighthouse.domain.user.entity.User;

import com.ssafy.lighthouse.domain.user.entity.UserTag;
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
	private Integer age;
	private Long sidoId;
	private Long gugunId;
	private String phoneNumber;
	private String description;
	List<UserTagDto> userTagList;

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
			.userTagList(user.getUserTags().stream().map(UserTagDto::new).collect(Collectors.toList()))
			.build();
	}
}
