package com.ssafy.lighthouse.domain.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class OAuthUserInfoDto {
	public String providerId;//socialId
	public String name;
	public String email;
	public String profileImg;

	@Builder
	public OAuthUserInfoDto(String providerId, String name, String email, String nickname, String profileImg) {
		this.providerId = providerId;
		this.name = name;
		this.email = email;
		this.profileImg = profileImg;
	}
}
