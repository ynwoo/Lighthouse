package com.ssafy.lighthouse.domain.user.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class UserTagRepositoryTest {
	@Autowired
	UserTagRepository userTagRepository;
	@Test
	void findTagIdByUserIdAndIsValid() {
		List<Object> tagIdByUserIdAndIsValid = userTagRepository.findTagIdByUserIdAndIsValid(1L, 1);
		for (Object l : tagIdByUserIdAndIsValid) {
			System.out.println(l);
		}
	}
}