package com.ssafy.lighthouse.domain.study.service;

import java.util.List;

import com.ssafy.lighthouse.domain.study.dto.SessionDto;
import com.ssafy.lighthouse.domain.study.entity.Session;

public interface SessionService {
	List<Session> findAllByStudyId(Long studyId);
	Long createSession(SessionDto.SessionReq dto);
	Long updateSession(Long id, SessionDto.SessionReq dto);
	Long removeSession(Long id);
	Session findById(Long id);
}
