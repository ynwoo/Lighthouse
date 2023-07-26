package com.ssafy.lighthouse.domain.study.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.lighthouse.domain.study.dto.SessionDto;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@Slf4j
public class SessionServiceTest {
	@Autowired
	private SessionService sessionService;

	private static final Long STUDY_ID = 1L;

	@Test
	public void createSessionTest() {
		int originalCount = sessionService.findAllByStudyId(STUDY_ID).size();

		SessionDto.SessionReq session = SessionDto.SessionReq.builder()
			.startedAt("2023-01-01")
			.endedAt("2023-01-02")
			.studyId(STUDY_ID)
			.title("Test Session")
			.description("")
			.comment("")
			.status(1)
			.seqNum(1)
			.build();

		sessionService.createSession(session);
		int newCount = sessionService.findAllByStudyId(STUDY_ID).size();
		Assertions.assertEquals(originalCount + 1, newCount);
	}
}