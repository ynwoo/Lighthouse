package com.ssafy.lighthouse.domain.study.service;

import java.util.List;

import com.ssafy.lighthouse.domain.study.dto.StudyNoticeDto;
import com.ssafy.lighthouse.domain.study.entity.StudyNotice;

public interface StudyNoticeService {
	List<StudyNotice> findAllByStudyId(int studyId);
	int createNotice(StudyNoticeDto.StudyNoticeReq dto);
	int updateNotice(int id, StudyNoticeDto.StudyNoticeReq dto);
	int removeNotice(int id);
	int createNoticeCheck(StudyNoticeDto.StudyNoticeCheckReq dto);
	StudyNotice findById(int id);
}
