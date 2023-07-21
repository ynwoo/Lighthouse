package com.ssafy.lighthouse.domain.study.service;

import java.util.List;

import com.ssafy.lighthouse.domain.study.dto.StudyNoticeDto;
import com.ssafy.lighthouse.domain.study.entity.StudyNotice;

public interface StudyNoticeService {
	List<StudyNotice> findAllByStudyId(int studyId);
	int create(StudyNoticeDto studyNotice);
	int update(int id, StudyNoticeDto studyNotice);
	int remove(int id);
	StudyNotice findById(int id);
}
