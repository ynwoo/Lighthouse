package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.StudyDto;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;

import java.util.List;


public interface StudyService {
    List<StudyDto> findAllByStudySearchOption(StudySearchOption options);
    StudyDto findDetailById(Long studyId);
    StudyDto createStudyById(Long studyId);
    void removeStudyById(Long studyId);
    void shareStudyById(Long studyId);
}
