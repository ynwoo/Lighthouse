package com.ssafy.lighthouse.domain.study.service;

import java.util.List;

import com.ssafy.lighthouse.domain.study.dto.QnaDto;
import com.ssafy.lighthouse.domain.study.entity.Qna;

public interface QnaService {
	List<Qna> findAllByStudyId(long studyId);

	List<Qna> findAllByUserId(long userId);
	long createQna(QnaDto.Req dto);
	long updateQna(long id, QnaDto.Req dto);
	long removeQna(long id);
	Qna findById(long id);
}
