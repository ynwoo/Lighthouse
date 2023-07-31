package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.StudyNoticeDto;
import com.ssafy.lighthouse.domain.study.entity.StudyNotice;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.Assert.assertEquals;

@SpringBootTest
public class StudyNoticeServiceTest {
	@Autowired
	private StudyNoticeService studyNoticeService;
	@Test
	public void findAllByStudyIdTest() {
		List<StudyNotice> studyNotices = studyNoticeService.findAllByStudyId(1L);
		assertEquals(3, studyNotices.size());
	}

	@Test
	public void createTest() {
		StudyNoticeDto.StudyNoticeReq dto = StudyNoticeDto.StudyNoticeReq.builder()
			.studyId(1L)
			.content("test content2")
			.build();

		studyNoticeService.createNotice(dto);
		List<StudyNotice> studyNotices = studyNoticeService.findAllByStudyId(1L);
		assertEquals(4, studyNotices.size());
	}

	@Test
	public void updateTest() {
		final String newContent = "updated test content";
		StudyNoticeDto.StudyNoticeReq dto = StudyNoticeDto.StudyNoticeReq.builder()
			.studyId(1L)
			.content(newContent)
			.build();

		studyNoticeService.updateNotice(7L, dto);
		Assert.assertEquals(studyNoticeService.findById(7L).getContent(), newContent);
	}

	@Test
	public void removeTest() {
		StudyNoticeDto.StudyNoticeReq dto = StudyNoticeDto.StudyNoticeReq.builder()
			.studyId(1L)
			.content("test content2")
			.build();

		studyNoticeService.removeNotice(7L);
		List<StudyNotice> studyNotices = studyNoticeService.findAllByStudyId(1L);
		assertEquals(3, studyNotices.size());
	}
}