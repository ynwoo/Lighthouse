package com.ssafy.lighthouse.domain.user.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.lighthouse.domain.user.entity.User;

@SpringBootTest
@ActiveProfiles("local")
@Transactional
class UserRepositoryTest {
	@Autowired
	UserRepository userRepository;

	@Test
	public void readUser() {
		System.out.println("유저 목록을 조회하는 테스트입니다");
		List<User> users = userRepository.findAll();
		for (User user : users) {
			System.out.println(user);
		}
	}
}