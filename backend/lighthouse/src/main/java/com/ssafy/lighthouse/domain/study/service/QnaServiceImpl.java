package com.ssafy.lighthouse.domain.study.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.lighthouse.domain.study.dto.QnaDto;
import com.ssafy.lighthouse.domain.study.entity.Qna;
import com.ssafy.lighthouse.domain.study.exception.StudyMaterialNotFoundException;
import com.ssafy.lighthouse.domain.study.repository.QnaRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class QnaServiceImpl implements QnaService {
	private QnaRepository qnaRepository;

	@Override
	public List<Qna> findAllByStudyId(long studyId) {
		return null;
	}

	@Override
	public List<Qna> findAllByUserId(long userId) {
		return null;
	}

	@Override
	public long createQna(QnaDto.Req dto) {
		Qna entity = qnaRepository.save(dto.toEntity());
		return entity.getId();
	}

	@Override
	public long updateQna(long id, QnaDto.Req dto) {
		Qna qna = findById(id);
		qna.update(dto.getUserId(), dto.getStudyId(), dto.getQuestion(), dto.getAnswer());
		return id;
	}

	@Override
	public long removeQna(long id) {
		Qna qna = findById(id);
		qna.remove();
		return id;
	}

	@Override
	public Qna findById(long id) {
		final Optional<Qna> qna = qnaRepository.findById(id);
		qna.orElseThrow(() -> new StudyMaterialNotFoundException(id));
		return qna.get();
	}
}
