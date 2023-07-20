package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.StudyNoticeDto;

public interface StudyNoticeService {
	void insert(StudyNoticeDto studyNotice);
	void update(StudyNoticeDto studyNotice);
	void delete(int id);
}
