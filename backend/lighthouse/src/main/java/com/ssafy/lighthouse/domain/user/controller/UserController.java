package com.ssafy.lighthouse.domain.user.controller;

import com.ssafy.lighthouse.domain.user.dto.UserMyPageDto;
import com.ssafy.lighthouse.domain.user.service.JwtService;
import com.ssafy.lighthouse.domain.user.service.UserService;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	private UserService userService;
	private JwtService jwtService;

	@Autowired
	public UserController(UserService userService, JwtService jwtService) {

		this.userService = userService;
		this.jwtService = jwtService;
	}

	@PostMapping
	public ResponseEntity<?> joinUser(@RequestBody UserMyPageDto userMyPageDto) {
		userService.addUser(userMyPageDto);
		return new ResponseEntity<>("", HttpStatus.OK);
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String, String> param) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = null;

		try {
			UserMyPageDto loginUser = userService.loginUser(param.get("userEmail"),
				param.get("userPwd"));
			if (loginUser != null) {
				logger.debug("로그인 유저 정보 : {}", loginUser);
				String accessToken = jwtService.createAccessToken("userId",
					loginUser.getId());// key, data
				String refreshToken = jwtService.createRefreshToken("userId",
					loginUser.getId());// key, data

				userService.saveRefreshToken(loginUser.getId(), refreshToken);

				logger.debug("로그인 accessToken 정보 : {}", accessToken);
				logger.debug("로그인 refreshToken 정보 : {}", refreshToken);
				resultMap.put("access-token", accessToken);
				resultMap.put("refresh-token", refreshToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			logger.error("로그인 실패 : {}", e);
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@GetMapping("/logout")
	public ResponseEntity<?> logoutUser(HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
		String token = request.getHeader("access-token");
		if (jwtService.checkToken(token)) {
			logger.info("사용 가능한 토큰!!!");

			// payload에서 id값 추출
			Long idByToken = jwtService.getIdByToken(token);
			// 리프레시 토큰 삭제
			try {
				userService.deleRefreshToken(idByToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.error("로그아웃 실패 : {}", e);
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		}

		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@PostMapping("/refresh")
	public ResponseEntity<?> refreshToken(HttpServletRequest request) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.ACCEPTED;
		String token = request.getHeader("refresh-token");
		if (jwtService.checkToken(token)) {
			// payload에서 id값 추출
			Long idByToken = jwtService.getIdByToken(token);
			if (token.equals(userService.getRefreshToken(idByToken))) {
				String accessToken = jwtService.createAccessToken("userId", idByToken);
				logger.debug("token : {}", accessToken);
				logger.debug("정상적으로 액세스토큰 재발급!!!");
				resultMap.put("access-token", accessToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			}
		} else {
			logger.debug("리프레쉬토큰도 사용불!!!!!!!");
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@GetMapping("/mypage")
	public ResponseEntity<Map<String, Object>> getInfo(
		HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;

		String token = request.getHeader("access-token");
		if (jwtService.checkToken(token)) {
			logger.info("사용 가능한 토큰!!!");
			try {
				// 로그인 사용자 정보
				Long idByToken = jwtService.getIdByToken(token);

				UserMyPageDto userMyPageDto = userService.getUserById(idByToken);

				resultMap.put("userInfo", userMyPageDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				logger.error("정보조회 실패 : {}", e);
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			logger.error("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL);
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	// @GetMapping("/mypage/{userId}")
	// public ResponseEntity<UserMyPageDto> getMyPageInfo(@PathVariable Long userId) {
	// 	// 전체 Tag 목록도 불러와야함
	// 	List<String> tags = userService.getKeywordsByUserId(userId);
	// 	System.out.println(tags.toString());
	// 	UserMyPageDto userMyPageDto = userService.getMyPageUser(userId);
	// 	return new ResponseEntity<>(userMyPageDto, HttpStatus.OK);
	// }

	@PutMapping("/update")
	public ResponseEntity<?> updateUser(@RequestBody UserMyPageDto userMyPageDto) {
		System.out.println(userMyPageDto.toString());
		try {
			userService.updateUser(userMyPageDto);
			return new ResponseEntity<String>("SUCCESS!!!", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>("FAIL!!!", HttpStatus.NOT_ACCEPTABLE);
		}
	}

	@DeleteMapping()
	public ResponseEntity<?> deleteUser(HttpServletRequest request) {
		logger.info("deleteUser - 호출");
		try {
			String token = request.getHeader("access-token");
			if (jwtService.checkToken(token)) {
				// payload에서 id값 추출
				Long idByToken = jwtService.getIdByToken(token);
				userService.deleteUser(idByToken);
			}
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
		}
	}
}
