package com.ssafy.lighthouse.domain.study.repository;


import com.ssafy.lighthouse.domain.study.dto.SimpleStudyDto;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;

import java.util.List;

public interface StudyRepositoryCustom {
    List<SimpleStudyDto> findAllByStudySearchOption(StudySearchOption studySearchOption);
}
