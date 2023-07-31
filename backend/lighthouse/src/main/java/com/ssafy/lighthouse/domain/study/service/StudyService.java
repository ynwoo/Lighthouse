package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.StudyDto;
import com.ssafy.lighthouse.domain.study.dto.StudyEvalDto;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;
import com.ssafy.lighthouse.domain.study.dto.StudyTagDto;

import java.util.List;


public interface StudyService {
    List<StudyDto> findAllByStudySearchOption(StudySearchOption options);
    StudyDto findDetailByStudyId(Long studyId);
    StudyDto createStudyByStudyId(Long studyId);
    void removeStudyByStudyId(Long studyId);
    void shareStudyById(Long studyId);

    // study-like
    void createStudyLike(Long studyId, Long userId);
    void removeStudyLike(Long studyId, Long userId);

    // study-bookmark
    void createStudyBookmark(Long studyId, Long userId);
    void removeStudyBookmark(Long studyId, Long userId);

    // study-eval
    void createStudyEval(StudyEvalDto studyEvalDto);
    void removeStudyEval(Long studyId, Long userId);

    // study-tag
    void createStudyTag(StudyTagDto studyTagDto);
    void removeStudyTag(Long studyId, Long tagId);
}
