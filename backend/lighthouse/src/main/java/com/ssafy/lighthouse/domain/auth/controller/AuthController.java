package com.ssafy.lighthouse.domain.auth.controller;

import com.ssafy.lighthouse.domain.auth.dto.OAuthTokenDto;
import com.ssafy.lighthouse.domain.auth.dto.OAuthUserInfoDto;
import com.ssafy.lighthouse.domain.auth.service.OAuthService;
import com.ssafy.lighthouse.domain.user.dto.AlertDto;
import com.ssafy.lighthouse.domain.user.entity.User;
import com.ssafy.lighthouse.domain.user.service.JwtService;
import com.ssafy.lighthouse.domain.user.service.UserService;
import java.net.URI;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
            HttpServletRequest request) {

        OAuthTokenDto oAuthTokenDto = oAuthService.getGoogleAccessToken(accessCode);
        OAuthUserInfoDto userInitialInfo = oAuthService.getUserInfo(oAuthTokenDto);

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
            List<AlertDto> alertDtoList = userService.getAlertDtoList(userEntity.getId());
            HttpSession session = request.getSession();
            // 세션에 로그인 회원정보 보관
            session.setAttribute("access_token", accessToken);
            session.setAttribute("refresh_token", refreshToken);
            session.setAttribute("userId", userEntity.getId().toString());
            session.setAttribute("alerts", alertDtoList);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        HttpHeaders headers = new HttpHeaders();

        // 프론트 서버로 리다이렉트
        headers.setLocation(URI.create("http://i9a409.p.ssafy.io:3000/"));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }
}
