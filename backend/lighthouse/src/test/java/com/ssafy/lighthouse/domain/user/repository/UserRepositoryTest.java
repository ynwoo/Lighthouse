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
	// @Rollback(false)
class UserRepositoryTest {
	@Autowired
	UserRepository userRepository;

	@Test
	public void testCreateUser() {
		User user = new User(
			"비밀번호789", "박철수", "parkcheolsu@example.com",
			"철수야", "", 21, 1, 4, "",
			"농구를 즐기고 여가 시간에 코딩을 하는 것을 좋아합니다.");

		User savedUser = userRepository.save(user);

		User findUser = userRepository.findById(savedUser.getId()).get();

		assertThat(findUser.getId()).isEqualTo(user.getId());
		assertThat(findUser.getName()).isEqualTo(user.getName());
		assertThat(findUser).isEqualTo(user);
	}

	@Test
	public void testUserCRUD() {
		User user = new User(
			"비밀번호789", "박철수", "parkcheolsu@example.com",
			"철수야", "", 21, 1, 4, "",
			"농구를 즐기고 여가 시간에 코딩을 하는 것을 좋아합니다.");

		// Create
		User savedUser = userRepository.save(user);

		// Retrieve
		User findUser = userRepository.findById(savedUser.getId()).get();
		assertThat(findUser).isEqualTo(user);

		// Update
		findUser.setNickname("new철수야");
		userRepository.save(findUser);

		User updatedUser = userRepository.findById(findUser.getId()).get();
		assertThat(updatedUser.getNickname()).isEqualTo(findUser.getNickname());

		// List
		List<User> users = userRepository.findAll();
		assertThat(users.size()).isEqualTo(3);

		// Count
		long count = userRepository.count();
		assertThat(count).isEqualTo(3);

		// Delete
		userRepository.delete(findUser);
		long deletedCount = userRepository.count();
		assertThat(deletedCount).isEqualTo(2);
	}
}