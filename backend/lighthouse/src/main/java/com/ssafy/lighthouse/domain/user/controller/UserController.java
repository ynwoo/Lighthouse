package com.ssafy.lighthouse.domain.user.controller;

import static org.springframework.http.HttpStatus.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.lighthouse.domain.user.dto.AlertDto;
import com.ssafy.lighthouse.domain.user.dto.EmailDto;
import com.ssafy.lighthouse.domain.user.dto.LoginDto;
import com.ssafy.lighthouse.domain.user.dto.NicknameDto;
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

	private final UserService userService;
	private final JwtService jwtService;

	@Autowired
	public UserController(UserService userService, JwtService jwtService) {
		this.userService = userService;
		this.jwtService = jwtService;
	}

	@PostMapping("/check-email")
	public ResponseEntity<Map<String, Object>> checkDuplicateEmail(@RequestBody EmailDto emailDto) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status;

		String emailToValidate = emailDto.getEmail();
		if (userService.isEmailUnique(emailToValidate)) {
			resultMap.put("available", true);
			status = HttpStatus.OK;
		} else {
			resultMap.put("available", false);
			status = HttpStatus.CONFLICT;
		}

		return new ResponseEntity<>(resultMap, status);
	}

	@PostMapping("/check-nickname")
	public ResponseEntity<Map<String, Object>> checkDuplicateNickname(@RequestBody NicknameDto nicknameDto) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status;

		String nicknameToValidate = nicknameDto.getNickname();
		if (userService.isNicknameUnique(nicknameToValidate)) {
			resultMap.put("available", true);
			status = HttpStatus.OK;
		} else {
			resultMap.put("available", false);
			status = HttpStatus.CONFLICT;
		}

		return new ResponseEntity<>(resultMap, status);
	}

	@PostMapping
	public ResponseEntity<String> joinUser(@RequestBody UserMyPageDto userMyPageDto) {
		userService.addUser(userMyPageDto);
		return new ResponseEntity<>("", HttpStatus.OK);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginDto loginDto) {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status;

		try {
			UserMyPageDto loginUser = userService.loginUser(loginDto.getUserEmail(),
				loginDto.getUserPwd());
			if (loginUser != null) {
				log.debug("로그인 유저 정보 : {}", loginUser);
				String accessToken = jwtService.createAccessToken("userId",
					loginUser.getId());// key, data
				String refreshToken = jwtService.createRefreshToken("userId",
					loginUser.getId());// key, data

				userService.saveRefreshToken(loginUser.getId(), refreshToken);

				log.debug("로그인 accessToken 정보 : {}", accessToken);
				log.debug("로그인 refreshToken 정보 : {}", refreshToken);
				resultMap.put("user-id", loginUser.getId());
				resultMap.put("access-token", accessToken);
				resultMap.put("refresh-token", refreshToken);
				resultMap.put("message", SUCCESS);
				resultMap.put("nickname", loginUser.getNickname());

				// 알림 목록 불러오기
				List<AlertDto> alertDtoList = userService.getAlertDtoList(loginUser.getId());
				resultMap.put("alerts", alertDtoList);

				status = HttpStatus.OK;
			} else {
				resultMap.put("message", FAIL);
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			log.error("로그인 실패 : {}", e.getMessage());
			resultMap.put("message", e.getMessage());
			status = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<>(resultMap, status);
	}

	@GetMapping("/logout")
	public ResponseEntity<Map<String, Object>> logoutUser(HttpServletRequest request) {
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
				log.error("로그아웃 실패 : {}", e.getMessage());
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		}

		return new ResponseEntity<>(resultMap, status);
	}

	@PostMapping("/refresh")
	public ResponseEntity<Map<String, Object>> refreshToken(HttpServletRequest request) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.UNAUTHORIZED;
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
				status = HttpStatus.OK;
			}
		} else {
			log.debug("리프레쉬토큰도 사용불가!!!!!!!");
		}
		return new ResponseEntity<>(resultMap, status);
	}

	// userId에 해당하는 유저 프로필 조회
	@GetMapping("/{user-id}")
	public ResponseEntity<?> findProfileByUserId(@PathVariable(name = "user-id") Long userId,
												 HttpServletRequest request) {
		Long loginId = (Long) request.getAttribute("userId");
		log.debug("userId : {}, loginId : {}", userId, loginId);
		return new ResponseEntity<>(userService.findProfileByUserId(userId, loginId), HttpStatus.OK);
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
				status = ACCEPTED;
			} catch (Exception e) {
				log.error("정보조회 실패 : {}", e.getMessage());
				resultMap.put("message", e.getMessage());
				status = HttpStatus.INTERNAL_SERVER_ERROR;
			}
		} else {
			log.error("사용 불가능 토큰!!!");
			resultMap.put("message", FAIL);
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<>(resultMap, status);
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
				return new ResponseEntity<>("SUCCESS!!!", HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>("FAIL!!!", HttpStatus.NOT_ACCEPTABLE);
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
	public ResponseEntity<?> createUserEval(@RequestBody UserEvalDto userEvalDto,
											HttpServletRequest request) {
		// session에서 userId 가져오기
		userEvalDto.setEvaluatorId((Long) request.getAttribute("userId"));
		log.debug("userId : {}", userEvalDto.getUserId());
		userService.createUserEval(userEvalDto);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/eval/{user-id}")
	public ResponseEntity<?> removeUserEval(@PathVariable(name = "user-id") Long userId,
											HttpServletRequest request) {
		// session에서 userId 가져오기
		Long evaluatorId = (Long) request.getAttribute("userId");
		log.debug("userId : {}", userId);
		userService.removeUserEval(userId, evaluatorId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PostMapping("/follow/{followee-id}")
	public ResponseEntity<?> createFollow(@PathVariable(name = "followee-id") Long followeeId,
										  HttpServletRequest request) {
		// session에서 userId 가져오기
		Long followerId = (Long) request.getAttribute("userId");
		log.debug("followerId : {}", followerId);
		userService.createFollow(followeeId, followerId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@DeleteMapping("/follow/{followee-id}")
	public ResponseEntity<?> removeFollow(@PathVariable(name = "followee-id") Long followeeId,
										  HttpServletRequest request) {
		// session에서 userId 가져오기
		Long followerId = (Long) request.getAttribute("userId");
		log.debug("followerId : {}", followerId);
		userService.removeFollow(followeeId, followerId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	// 내가 팔로우한 아이디 리스트
	@GetMapping("/follow")
	public ResponseEntity<?> findFollowAllByFollowerId(HttpServletRequest request) {
		// session에서 userId 가져오기
		Long followerId = (Long) request.getAttribute("userId");
		log.debug("followerId : {}", followerId);
		List<Long> followingList = userService.findFollowAllByFollowerId(followerId);
		return new ResponseEntity<>(followingList, HttpStatus.OK);
	}

	// profile img 저장
	@PutMapping("/profile")
	public ResponseEntity<?> updateProfileImage(@RequestPart(value = "img") MultipartFile img,
												HttpServletRequest request) {
		// session에서 userId 가져오기
		Long userId = (Long) request.getAttribute("userId");
		log.debug("followerId : {}", userId);
		userService.updateProfileImage(img, userId);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
