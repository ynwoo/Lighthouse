package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.StudyDto;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;
import com.ssafy.lighthouse.domain.study.entity.Study;

import java.util.List;


public interface StudyService {
    List<StudyDto> findAllByStudySearchOption(StudySearchOption options);
    StudyDto findDetailById(int studyId);
    StudyDto createById(int studyId);
}
