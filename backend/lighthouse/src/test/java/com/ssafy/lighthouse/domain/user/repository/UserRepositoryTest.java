package com.ssafy.lighthouse.domain.user.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
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
	public void testUser() {
		User user = new User(
			"qqq123", "동길홍", "honggildong123@example.com",
			"길동이123", "", 21, 1, 2, "",
			"인공지능에 관심이 많은 컴퓨터공학 학생입니다.");

		User savedUser = userRepository.save(user);

		User findUser = userRepository.findById(savedUser.getId()).get();

		assertThat(findUser.getId()).isEqualTo(user.getId());
		assertThat(findUser.getName()).isEqualTo(user.getName());
		assertThat(findUser).isEqualTo(user);
	}

	@Test
	public void readUser() {
		System.out.println("유저 목록을 조회하는 테스트입니다");
		List<User> users = userRepository.findAll();
		for (User user : users) {
			System.out.println(user);
		}
	}
}