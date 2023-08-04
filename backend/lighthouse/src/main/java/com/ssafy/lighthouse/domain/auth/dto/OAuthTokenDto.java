package com.ssafy.lighthouse.domain.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuthTokenDto {
	private String accessToken;
	private String expiresIn;
	private String scope;
	private String tokenType;
	private String idToken;

	@Builder
	public OAuthTokenDto(String accessToken, String expiresIn, String scope, String tokenType, String idToken) {
		this.accessToken = accessToken;
		this.expiresIn = expiresIn;
		this.scope = scope;
		this.tokenType = tokenType;
		this.idToken = idToken;
	}
}
