package com.ssafy.lighthouse.domain.study.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.List;
import java.util.Optional;

import org.junit.After;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.lighthouse.domain.study.entity.StudyNotice;

@SpringBootTest
public class StudyNoticeRepositoryTest {
	@Autowired
	StudyNoticeRepository studyNoticeRepository;

	@Test
	public void saveTest() {
		//생성
		StudyNotice studyNotice = StudyNotice.builder()
			.studyId(1L)
			.content("test notice content")
			.build();
		
		//저장
		studyNoticeRepository.save(studyNotice);
		System.out.println(studyNotice);
		//조회
		StudyNotice entity = studyNoticeRepository.findById(7).get();
		assertThat(entity.getStudyId()).isEqualTo(1);
		assertThat(entity.getContent()).isEqualTo("test notice content");

		/*
		Optional<StudyNotice> entity = studyNoticeRepository.findById(1);
		entity.ifPresent(selected -> {

		});
		 */
	}
	@Test
	public void findAllTest() {
		//전체 수 조회
		long count = studyNoticeRepository.count();
		//전체 조회
		List<StudyNotice> studyNotices = studyNoticeRepository.findAll();
	}

	@Test
	public void deleteTest() {
		//조회
		StudyNotice entity = studyNoticeRepository.findById(1).get();
		
		//삭제
		studyNoticeRepository.delete(entity);
	}
	@Test
	public void updateTest() {
		final int studyNoticeId = 1;
		Optional<StudyNotice> studyNotice = studyNoticeRepository.findById(studyNoticeId);
		studyNotice.ifPresent(selectStudyNotice -> {
		});
	}



}