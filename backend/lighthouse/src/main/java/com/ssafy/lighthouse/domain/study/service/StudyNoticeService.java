package com.ssafy.lighthouse.domain.study.service;

import java.util.List;

import com.ssafy.lighthouse.domain.study.dto.StudyNoticeDto;
import com.ssafy.lighthouse.domain.study.entity.StudyNotice;

public interface StudyNoticeService {
	List<StudyNotice> findAllByStudyId(Long studyId);
	Long createNotice(StudyNoticeDto.StudyNoticeReq dto);
	Long updateNotice(Long id, StudyNoticeDto.StudyNoticeReq dto);
	Long removeNotice(Long id);
	Long createNoticeCheck(StudyNoticeDto.StudyNoticeCheckReq dto);
	StudyNotice findById(Long id);
}
