package com.ssafy.lighthouse.domain.study.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.lighthouse.domain.study.dto.StudyNoticeDto;
import com.ssafy.lighthouse.domain.study.entity.StudyNotice;
import com.ssafy.lighthouse.domain.study.entity.StudyNoticeCheck;
import com.ssafy.lighthouse.domain.study.exception.StudyNoticeNotFoundException;
import com.ssafy.lighthouse.domain.study.repository.StudyNoticeCheckRepository;
import com.ssafy.lighthouse.domain.study.repository.StudyNoticeRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class StudyNoticeServiceImpl implements StudyNoticeService {
	private StudyNoticeRepository studyNoticeRepository;
	private StudyNoticeCheckRepository studyNoticeCheckRepository;

	@Override
	public List<StudyNotice> findAllByStudyId(Long studyId) {
		return studyNoticeRepository.findByStudyId(studyId);
	}

	@Override
	public Long createNotice(final StudyNoticeDto.StudyNoticeReq dto) {
		StudyNotice entity = studyNoticeRepository.save(dto.toEntity());
		return entity.getId();
	}

	@Override
	public Long updateNotice(final Long id, final StudyNoticeDto.StudyNoticeReq dto) {
		StudyNotice studyNotice = findById(id);
		studyNotice.update(dto.getStudyId(), dto.getContent());
		return id;
	}

	@Override
	public Long removeNotice(final Long id) {
		StudyNotice studyNotice = findById(id);
		studyNotice.remove();
		return id;
	}

	@Override
	public Long createNoticeCheck(StudyNoticeDto.StudyNoticeCheckReq dto) {
		StudyNoticeCheck entity = studyNoticeCheckRepository.save(dto.toEntity());
		return entity.getId();
	}

	@Override
	public StudyNotice findById(final Long id) {
		final Optional<StudyNotice> studyNotice = studyNoticeRepository.findById(id.intValue());
		studyNotice.orElseThrow(() -> new StudyNoticeNotFoundException(id));
		return studyNotice.get();
	}
}
