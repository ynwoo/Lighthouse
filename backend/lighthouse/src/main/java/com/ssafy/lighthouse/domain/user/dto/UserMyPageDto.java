package com.ssafy.lighthouse.domain.user.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.lighthouse.domain.user.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
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
	private MultipartFile profileImgFile;
	List<Long> userTagList;

	@Builder
	public UserMyPageDto(Long id, String password, String name, String email, String nickname, String profileImgUrl,
		Integer age,
		Long sidoId, Long gugunId, String phoneNumber, String description, List<Long> userTagList) {
		this.id = id;
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
		this.userTagList = userTagList;
	}

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
