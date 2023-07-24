package com.ssafy.lighthouse.domain.study.service;

import java.util.List;

import org.junit.jupiter.api.Assertions;
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
	public void findByStudyId() {
		List<Session> sessions = sessionService.findAllByStudyId(1);
		List<StudyMaterial> materials = sessions.get(0).getStudyMaterials();
		log.debug("-----------materials: {}", materials);
		Assertions.assertEquals(3, materials.size());
	}
}