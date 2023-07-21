package com.ssafy.lighthouse.domain.study.service;

import static org.junit.Assert.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.lighthouse.domain.study.dto.StudyNoticeDto;
import com.ssafy.lighthouse.domain.study.entity.StudyNotice;

@SpringBootTest
public class StudyNoticeServiceTest {
	@Autowired
	private StudyNoticeService studyNoticeService;
	@Test
	public void findAllByStudyIdTest() {
		List<StudyNotice> studyNotices = studyNoticeService.findAllByStudyId(1);
		assertEquals(3, studyNotices.size());
	}

	@Test
	public void createTest() {
		StudyNoticeDto dto = StudyNoticeDto.builder()
			.studyId(1)
			.content("test content2")
			.build();

		studyNoticeService.create(dto);
		List<StudyNotice> studyNotices = studyNoticeService.findAllByStudyId(1);
		assertEquals(4, studyNotices.size());
	}

	@Test
	public void updateTest() {
		final String newContent = "updated test content";
		StudyNoticeDto dto = StudyNoticeDto.builder()
			.studyId(1)
			.content(newContent)
			.build();

		studyNoticeService.update(7, dto);
		assertEquals(studyNoticeService.findById(7).getContent(), newContent);
	}

	@Test
	public void removeTest() {
		StudyNoticeDto dto = StudyNoticeDto.builder()
			.studyId(1)
			.content("test content2")
			.build();

		studyNoticeService.remove(7);
		List<StudyNotice> studyNotices = studyNoticeService.findAllByStudyId(1);
		assertEquals(3, studyNotices.size());
	}
}