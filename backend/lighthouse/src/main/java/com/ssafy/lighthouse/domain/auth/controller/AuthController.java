package com.ssafy.lighthouse.domain.auth.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.lighthouse.domain.auth.dto.OAuthTokenDto;
import com.ssafy.lighthouse.domain.auth.dto.OAuthUserInfoDto;
import com.ssafy.lighthouse.domain.auth.service.OAuthService;
import com.ssafy.lighthouse.domain.user.dto.AlertDto;
import com.ssafy.lighthouse.domain.user.entity.User;
import com.ssafy.lighthouse.domain.user.service.JwtService;
import com.ssafy.lighthouse.domain.user.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	private final UserService userService;
	private final OAuthService oAuthService;
	private final JwtService jwtService;

	@Autowired
	public AuthController(OAuthService oAuthService, UserService userService, JwtService jwtService) {
		this.oAuthService = oAuthService;
		this.userService = userService;
		this.jwtService = jwtService;
	}

	@GetMapping("/callback/google")
	public ResponseEntity<?> successGoogleLogin(@RequestParam("code") String accessCode) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status;

		OAuthTokenDto oAuthTokenDto = oAuthService.getGoogleAccessToken(accessCode);
		OAuthUserInfoDto userInitialInfo = oAuthService.getUserInfo(oAuthTokenDto);
		System.out.println(userInitialInfo);

		// providerID로 User 존재하는지 확인
		User userEntity = userService.getUserByProviderId(userInitialInfo.getProviderId());
		if (userEntity == null) { // 새로운 유저 -> User 테이블에 저장
			userEntity = userService.addOAuthUser(userInitialInfo);
		} else if (userEntity.getIsValid() == 0) {
			userEntity.updateIsvalid();
		}

		// jwt 토큰 발급
		String accessToken = jwtService.createAccessToken("userId", userEntity.getId());
		String refreshToken = jwtService.createRefreshToken("userId", userEntity.getId());

		try {
			userService.saveRefreshToken(userEntity.getId(), refreshToken);
			log.debug("소셜 로그인 accessToken 정보 : {}", accessToken);
			log.debug("소셜 로그인 refreshToken 정보 : {}", refreshToken);

			resultMap.put("access-token", accessToken);
			resultMap.put("refresh-token", refreshToken);
			resultMap.put("message", SUCCESS);

			// 알림 목록 불러오기
			List<AlertDto> alertDtoList = userService.getAlertDtoList(userEntity.getId());
			resultMap.put("alerts", alertDtoList);

			status = HttpStatus.OK;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return new ResponseEntity<>(resultMap, status);
	}

}
