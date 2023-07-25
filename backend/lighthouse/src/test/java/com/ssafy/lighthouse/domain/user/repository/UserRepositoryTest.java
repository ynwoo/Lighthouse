package com.ssafy.lighthouse.domain.user.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.ssafy.lighthouse.domain.user.entity.User;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
	// @Rollback(value = false)
class UserRepositoryTest {
	@Autowired
	UserRepository userRepository;

	@PersistenceContext
	EntityManager em;

	@Test
	public void testCreateUser() {
		User user = new User(
			"비밀번호789", "박철수", "parkcheolsu@example.com",
			"철수야", "", 21, 1L, 4L, "",
			"농구를 즐기고 여가 시간에 코딩을 하는 것을 좋아합니다.");

		User savedUser = userRepository.save(user);
		em.flush();
		em.clear();

		User findedUser = userRepository.findById((long) savedUser.getId().intValue()).get();

		assertThat(findedUser.getId()).isEqualTo(savedUser.getId());
		assertThat(findedUser.getName()).isEqualTo(savedUser.getName());

		findedUser.remove();
	}

	@Test
	public void testUserCRUD() {
		User user = new User(
			"비밀번호789", "박철수", "parkcheolsu@example.com",
			"철수야", "", 21, 1L, 4L, "",
			"농구를 즐기고 여가 시간에 코딩을 하는 것을 좋아합니다.");

		// Create
		User savedUser = userRepository.save(user);

		em.flush();
		em.clear();

		// Retrieve
		User findedUser = userRepository.findById(savedUser.getId()).get();
		assertThat(findedUser.getId()).isEqualTo(savedUser.getId());

		// Update : 닉네임 업데이트
		findedUser.updateUserInfo(findedUser.getPassword(), findedUser.getName(),
			"new철수야", findedUser.getProfileImgUrl(), findedUser.getAge(),
			findedUser.getSidoId(), findedUser.getGugunId(), findedUser.getPhoneNumber(), findedUser.getDescription());

		User updatedUser = userRepository.findById(findedUser.getId()).get();
		assertThat(updatedUser.getNickname()).isEqualTo("new철수야");

		// Delete
		User deleteUser = userRepository.findById(updatedUser.getId()).get();
		deleteUser.remove();

		// List
		List<User> validUsers = userRepository.findByIsValid(1);
		assertThat(validUsers.size()).isEqualTo(0);
	}

	@Test
	public void testGetUserByEmail() {
		String email = "ssafy@example.com";
		System.out.println(userRepository.findByEmail(email).getId());
		System.out.println(userRepository.findByEmail(email).getEmail());
	}
}