package com.ssafy.lighthouse.domain.study.repository;


import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;
import com.ssafy.lighthouse.domain.study.entity.Study;

import java.util.List;

public interface StudyRepositoryCustom {
    List<Study> findAllByStudySearchOption(StudySearchOption studySearchOption);
}
