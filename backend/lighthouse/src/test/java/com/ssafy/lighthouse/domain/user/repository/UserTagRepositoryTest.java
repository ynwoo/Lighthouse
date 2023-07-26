package com.ssafy.lighthouse.domain.user.repository;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.lighthouse.domain.user.entity.UserTag;

@SpringBootTest
@Transactional
class UserTagRepositoryTest {
	@Autowired
	UserTagRepository userTagRepository;
	@Test
	void findTagIdByUserIdAndIsValid() {
		List<UserTag> userTags = userTagRepository.findByUserIdAndIsValid(1L, 1);
		for (UserTag userTag : userTags) {
			System.out.println(userTag.getTagId());
		}
	}
}