package com.ssafy.lighthouse.domain.user.dto;

import com.ssafy.lighthouse.domain.common.dto.GugunDto;
import com.ssafy.lighthouse.domain.common.dto.SidoDto;
import com.ssafy.lighthouse.domain.user.entity.User;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

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
			.userTagList(user.getUserTags().stream().map(UserTagDto::new).collect(Collectors.toList()))
			.build();
	}
}
