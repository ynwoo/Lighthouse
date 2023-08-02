package com.ssafy.lighthouse.domain.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.lighthouse.domain.user.dto.UserEvalDto;
import com.ssafy.lighthouse.domain.user.dto.UserMyPageDto;
import com.ssafy.lighthouse.domain.user.service.JwtService;
import com.ssafy.lighthouse.domain.user.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/users")
public class UserController {
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
				log.debug("로그인 유저 정보 : {}", loginUser);
				String accessToken = jwtService.createAccessToken("userId",
					loginUser.getId());// key, data
				String refreshToken = jwtService.createRefreshToken("userId",
					loginUser.getId());// key, data

				userService.saveRefreshToken(loginUser.getId(), refreshToken);

				log.debug("로그인 accessToken 정보 : {}", accessToken);
				log.debug("로그인 refreshToken 정보 : {}", refreshToken);
				resultMap.put("access-token", accessToken);
				resultMap.put("refresh-token", refreshToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.ACCEPTED;
			}
		} catch (Exception e) {
			log.error("로그인 실패 : {}", e);
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
			log.info("사용 가능한 토큰!!!");

			// payload에서 id값 추출
			Long idByToken = jwtService.getIdByToken(token);
			// 리프레시 토큰 삭제
			try {
				userService.deleRefreshToken(idByToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				log.error("로그아웃 실패 : {}", e);
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
				log.debug("token : {}", accessToken);
				log.debug("정상적으로 액세스토큰 재발급!!!");
				resultMap.put("access-token", accessToken);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			}
		} else {
			log.debug("리프레쉬토큰도 사용불!!!!!!!");
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	// userId에 해당하는 유저 프로필 조회
	@GetMapping("/{user-id}")
	public ResponseEntity<?> findProfileByUserId(@PathVariable(name = "user-id") Long userId) {
		log.debug("userId : {}", userId);
		return new ResponseEntity<>(userService.findProfileByUserId(userId), HttpStatus.OK);
	}

	@GetMapping("/mypage")
	public ResponseEntity<Map<String, Object>> getInfo(
		HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status;

		String token = request.getHeader("access-token");
		if (jwtService.checkToken(token)) {
			log.info("사용 가능한 토큰!!!");
			try {
				// 로그인 사용자 정보
				Long idByToken = jwtService.getIdByToken(token);

				UserMyPageDto userMyPageDto = userService.getUserById(idByToken);

				resultMap.put("userInfo", userMyPageDto);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;
			} catch (Exception e) {
				log.error("정보조회 실패 : {}", e);
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			log.error("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL);
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateUser(HttpServletRequest request, @RequestBody UserMyPageDto userMyPageDto) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status;
		String token = request.getHeader("access-token");

		if (jwtService.checkToken(token)) {
			log.info("사용 가능한 토큰!!!");
			try {
				userService.updateUser(userMyPageDto);
				return new ResponseEntity<String>("SUCCESS!!!", HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<String>("FAIL!!!", HttpStatus.NOT_ACCEPTABLE);
			}

		} else {
			log.error("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL);
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<>(resultMap, status);
	}

	@DeleteMapping()
	public ResponseEntity<?> deleteUser(HttpServletRequest request) {
		log.info("deleteUser - 호출");

		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status;
		try {
			String token = request.getHeader("access-token");
			if (jwtService.checkToken(token)) {
				// payload에서 id값 추출
				Long idByToken = jwtService.getIdByToken(token);
				userService.deleteUser(idByToken);

				return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
			} else {
				log.error("사용 불가능 토큰!!!");
				resultMap.put("message", FAIL);
				status = HttpStatus.UNAUTHORIZED;
				return new ResponseEntity<>(resultMap, status);
			}
		} catch (Exception e) {
			return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
		}
	}

	@PostMapping("/eval")
	public ResponseEntity<?> createUserEval(@RequestBody UserEvalDto userEvalDto) {
		// session에서 userId 가져오기
		userEvalDto.setEvaluatorId(getUserId());
		log.debug("userId : {}", userEvalDto.getUserId());
		userService.createUserEval(userEvalDto);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/eval/{user-id}")
	public ResponseEntity<?> removeUserEval(@PathVariable(name = "user-id") Long userId) {
		// session에서 userId 가져오기
		Long evaluatorId = getUserId();
		log.debug("userId : {}", userId);
		userService.removeUserEval(userId, evaluatorId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PostMapping("/follow/{followee-id}")
	public ResponseEntity<?> createFollow(@PathVariable(name = "followee-id") Long followeeId) {
		// session에서 userId 가져오기
		Long followerId = getUserId();
		log.debug("followerId : {}", followerId);
		userService.createFollow(followeeId, followerId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/follow/{followee-id}")
	public ResponseEntity<?> removeFollow(@PathVariable(name = "followee-id") Long followeeId) {
		// session에서 userId 가져오기
		Long followerId = getUserId();
		log.debug("followerId : {}", followerId);
		userService.removeFollow(followeeId, followerId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	private Long getUserId() {
		//		String token = request.getHeader("access-token");
		//		if (jwtService.checkToken(token)) {
		//			log.info("사용 가능한 토큰!!!");
		//			// 로그인 사용자 정보
		//			Long idByToken = jwtService.getIdByToken(token);
		//
		//			UserMyPageDto userMyPageDto = userService.getUserById(idByToken);
		//			return userMyPageDto.getId();
		//		}
		//		throw new UnAuthorizedException();
		return 1L;
	}
}
