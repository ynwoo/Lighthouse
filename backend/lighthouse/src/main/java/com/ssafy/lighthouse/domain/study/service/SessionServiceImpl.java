package com.ssafy.lighthouse.domain.study.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.lighthouse.domain.study.dto.SessionDto;
import com.ssafy.lighthouse.domain.study.entity.Session;
import com.ssafy.lighthouse.domain.study.entity.SessionCheck;
import com.ssafy.lighthouse.domain.study.exception.SessionNotFoundException;
import com.ssafy.lighthouse.domain.study.repository.SessionCheckRepository;
import com.ssafy.lighthouse.domain.study.repository.SessionRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class SessionServiceImpl implements SessionService {
	private SessionRepository sessionRepository;
	private SessionCheckRepository sessionCheckRepository;

	@Override
	public List<Session> findAllByStudyId(Long studyId) {
		return sessionRepository.findByStudyId(studyId);
	}

	@Override
	public Long createSession(final SessionDto.SessionReq dto) {
		Session entity = sessionRepository.save(dto.toEntity());
		return entity.getId();
	}

	@Override
	public Long updateSession(final Long id, final SessionDto.SessionReq dto) {
		Session session = findById(id);
		session.update(dto.getStartedAt(), dto.getEndedAt(), dto.getStudyId(), dto.getTitle(),
			dto.getDescription(), dto.getComment(), dto.getStatus(), dto.getSeqNum());
		return id;
	}

	@Override
	public Long removeSession(final Long id) {
		Session studySession = findById(id);
		studySession.remove();
		return id;
	}

	@Override
	public Long createSessionCheck(SessionDto.SessionCheckReq dto) {
		SessionCheck entity = sessionCheckRepository.save(dto.toEntity());
		return entity.getId();
	}

	@Override
	public Session findById(final Long id) {
		final Optional<Session> studySession = sessionRepository.findById(id);
		studySession.orElseThrow(() -> new SessionNotFoundException(id));
		return studySession.get();
	}
}
