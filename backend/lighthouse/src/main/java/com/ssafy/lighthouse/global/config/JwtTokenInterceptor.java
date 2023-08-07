package com.ssafy.lighthouse.global.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import com.ssafy.lighthouse.domain.user.exception.UnAuthorizedException;
import com.ssafy.lighthouse.domain.user.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
@Configuration
public class JwtTokenInterceptor implements HandlerInterceptor {

	private final JwtService jwtService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
		Exception {
		// header에서 토큰 가져오기
		log.info(request.getMethod());
		log.info(request.getRequestURI());
		String requestURI = request.getRequestURI();
		String method = request.getMethod();

		if (method.equals("OPTIONS")) {
			return true;
		}

		// user 회원 가입 제외
		if (requestURI.equals("/users") && method.equals(HttpMethod.POST.name())) {
			return true;
		}

		if (requestURI.startsWith("/study")) {
			// study 전체 조회 제외 & 상세 조회 제외
			if (method.equals(HttpMethod.GET.name())) {
				return true;
			}

			// study badge 수정 제외
			if (method.equals(HttpMethod.PUT.name())) {
				return true;
			}
		}

		String token = request.getHeader("access-token");
		if (jwtService.checkToken(token)) {
			log.info("사용 가능한 토큰!!!");

			// token으로 유저 id 구해오기
			Long userId = jwtService.getIdByToken(token);

			// id가 유효한 값일 때 true 리턴
			if (userId != null) {
				// userid attribute로 저장
				request.setAttribute("userId", userId);
				return true;
			}
		}
		// 사용 불가능한 토큰이면 예외처리
		throw new UnAuthorizedException();
	}
}
