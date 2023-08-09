package com.ssafy.lighthouse.domain.auth.controller;

import java.net.URI;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.lighthouse.domain.auth.dto.OAuthTokenDto;
import com.ssafy.lighthouse.domain.auth.dto.OAuthUserInfoDto;
import com.ssafy.lighthouse.domain.auth.service.OAuthService;
import com.ssafy.lighthouse.domain.user.entity.User;
import com.ssafy.lighthouse.domain.user.service.JwtService;
import com.ssafy.lighthouse.domain.user.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final OAuthService oAuthService;
    private final JwtService jwtService;

    @Autowired
    public AuthController(OAuthService oAuthService, UserService userService,
            JwtService jwtService) {
        this.oAuthService = oAuthService;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping("/callback/google")
    public ResponseEntity<?> successGoogleLogin(
            @RequestParam("code") String accessCode,
            HttpServletResponse response) {

        OAuthTokenDto oAuthTokenDto = oAuthService.getGoogleAccessToken(accessCode);
        OAuthUserInfoDto userInitialInfo = oAuthService.getUserInfo(oAuthTokenDto);
        System.out.println(userInitialInfo);

        // providerID로 User 존재하는지 확인
        User userEntity = userService.getUserByProviderId(userInitialInfo.getProviderId());
        if (userEntity == null) { // 새로운 유저 -> User 테이블에 저장
            userEntity = userService.addOAuthUser(userInitialInfo);
        } else if (userEntity.getIsValid() == 0) { // 회원탈퇴했던 유저라면 복귀
            userEntity.updateIsvalid();
        }

        // jwt 토큰 발급
        String accessToken = jwtService.createAccessToken("userId", userEntity.getId());
        String refreshToken = jwtService.createRefreshToken("userId", userEntity.getId());

        try {
            userService.saveRefreshToken(userEntity.getId(), refreshToken);
            log.debug("소셜 로그인 accessToken 정보 : {}", accessToken);
            log.debug("소셜 로그인 refreshToken 정보 : {}", refreshToken);

            // 알림 목록 불러오기
            // List<AlertDto> alertDtoList = userService.getAlertDtoList(userEntity.getId());
            // resultMap.put("alerts", alertDtoList);

            Cookie c1 = makeCookie("access_token", accessToken);
            response.addCookie(c1);

            Cookie c2 = makeCookie("refresh_token", refreshToken);
            response.addCookie(c2);

            Cookie c3 = makeCookie("user_id", userEntity.getId().toString());
            response.addCookie(c3);

            // StringBuilder sb = new StringBuilder();
            // for (AlertDto alertDto : alertDtoList) {
            // 	System.out.println(alertDto);
            // 	sb.append(alertDto);
            // }
            // System.out.println(sb);
            // log.debug(sb.toString());
            // Cookie c4 = makeCookie("alerts", sb.toString());
            // response.addCookie(c4);

            // resultMap.put("user-id", userEntity.getId());
            // resultMap.put("access-token", accessToken);
            // resultMap.put("refresh-token", refreshToken);
            // resultMap.put("message", SUCCESS);

            // status = HttpStatus.OK;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        HttpHeaders headers = new HttpHeaders();

        // 프론트 서버로 리다이렉트
        headers.setLocation(URI.create("http://127.0.0.1:3000/"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    private Cookie makeCookie(String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(60 * 60 * 24 * 7);
        cookie.setHttpOnly(false);
        cookie.setPath("/");

        return cookie;
    }

}
