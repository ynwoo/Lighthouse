package com.ssafy.lighthouse.domain.user.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.common.dto.GugunDto;
import com.ssafy.lighthouse.domain.common.dto.SidoDto;
import com.ssafy.lighthouse.domain.common.dto.TagDto;
import com.ssafy.lighthouse.domain.common.entity.Sido;
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
	private SidoDto sido;
	private GugunDto gugun;
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
			.sido(new SidoDto(user.getSido()))
			.gugun(new GugunDto(user.getGugun()))
			.phoneNumber(user.getPhoneNumber())
			.description(user.getDescription())
			.userTagList(user.getUserTags().stream().filter(BaseEntity::isValid).map(UserTagDto::new).collect(Collectors.toList()))
			.build();
	}
}
