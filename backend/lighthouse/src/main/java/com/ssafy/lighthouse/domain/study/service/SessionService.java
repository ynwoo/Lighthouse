package com.ssafy.lighthouse.domain.study.service;

import java.util.List;

import com.ssafy.lighthouse.domain.study.dto.SessionDto;
import com.ssafy.lighthouse.domain.study.entity.Session;

public interface SessionService {
	List<Session> findAllByStudyId(int studyId);
	int createSession(SessionDto.SessionReq dto);
	int updateSession(int id, SessionDto.SessionReq dto);
	int removeSession(int id);
	Session findById(int id);
}
