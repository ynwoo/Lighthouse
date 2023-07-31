package com.ssafy.lighthouse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableWebMvc
@EnableScheduling // 스케줄러 사용
@SpringBootApplication
public class LighthouseApplication {

	public static void main(String[] args) {
		SpringApplication.run(LighthouseApplication.class, args);
	}

}
