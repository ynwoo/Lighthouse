package com.ssafy.lighthouse.domain.study.repository;


import com.ssafy.lighthouse.domain.study.dto.SimpleStudyDto;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;
import org.springframework.data.domain.Page;

import java.util.List;

public interface StudyRepositoryCustom {
    Page<SimpleStudyDto> findAllByStudySearchOption(StudySearchOption studySearchOption);
}
