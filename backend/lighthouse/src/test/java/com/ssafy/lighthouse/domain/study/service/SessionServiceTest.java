package com.ssafy.lighthouse.domain.study.service;

import static org.junit.Assert.*;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.lighthouse.domain.study.entity.Session;
import com.ssafy.lighthouse.domain.study.entity.StudyMaterial;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class SessionServiceTest {
	@Autowired
	private SessionService sessionService;

	@Test
	public void findById() {
		Session session = sessionService.findById(1);
		Set<StudyMaterial> materials = session.getStudyMaterials();
		log.debug("-----------materials: {}", materials);
		assertEquals(3, materials.size());
	}
}