package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.StudyNoticeDto;

public interface StudyNoticeService {
	void create(StudyNoticeDto studyNotice);
	void update(StudyNoticeDto studyNotice);
	void remove(int id);
}
