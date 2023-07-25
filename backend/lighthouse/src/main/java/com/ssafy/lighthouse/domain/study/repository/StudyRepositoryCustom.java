package com.ssafy.lighthouse.domain.study.repository;


import com.ssafy.lighthouse.domain.study.dto.StudyDto;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;

import java.util.List;

public interface StudyRepositoryCustom {
    List<StudyDto> findAllByStudySearchOption(StudySearchOption studySearchOption);
}
