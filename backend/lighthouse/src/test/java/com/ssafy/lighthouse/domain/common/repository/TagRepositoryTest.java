package com.ssafy.lighthouse.domain.common.repository;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.lighthouse.domain.common.entity.Tag;

@SpringBootTest
@Transactional
class TagRepositoryTest {
	private static final Logger logger = LoggerFactory.getLogger(TagRepositoryTest.class);
	@Autowired
	TagRepository tagRepository;

	@Test
	public void testGetTagList() {
		List<Tag> foundTags = tagRepository.findAll();
		for (Tag tag : foundTags) {
			logger.debug("tag id : {}, tag keyword {}", tag.getId(), tag.getKeyword());
		}
	}
}