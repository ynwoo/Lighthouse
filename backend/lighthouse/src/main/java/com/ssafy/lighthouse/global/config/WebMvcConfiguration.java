package com.ssafy.lighthouse.global.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class WebMvcConfiguration implements WebMvcConfigurer {

	private final JwtTokenInterceptor jwtTokenInterceptor;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOriginPatterns("*")
			.allowedMethods("*")
			.allowCredentials(true);
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(jwtTokenInterceptor)
				// user
				.addPathPatterns("/users/mypage")
				.addPathPatterns("/users/logout")
				.addPathPatterns("/users/follow", "/users/follow/*")
				.addPathPatterns("/users/profile/*")
				.addPathPatterns("/users/eval", "/users/eval/*")

				// study
				.addPathPatterns("/study")
				.addPathPatterns("/study/**")
				.addPathPatterns("/participation-history/*")
				.addPathPatterns("/users");
	}
}
