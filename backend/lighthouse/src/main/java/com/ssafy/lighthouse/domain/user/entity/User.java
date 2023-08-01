package com.ssafy.lighthouse.domain.user.entity;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.*;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.user.dto.UserMyPageDto;

import com.ssafy.lighthouse.domain.user.dto.UserTagDto;
import lombok.AccessLevel;
import lombok.Builder;
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

	@JoinColumn(name = "userId")
    @OneToMany(fetch = FetchType.LAZY)
    private List<UserTag> userTags;

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
				.userTags(userMyPageDto.getUserTagList().stream().map(UserTagDto::toEntity).collect(Collectors.toList()))
				.build();
    }
}
