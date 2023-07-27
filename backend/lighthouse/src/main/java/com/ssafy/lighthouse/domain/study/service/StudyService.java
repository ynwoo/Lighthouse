package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.*;
import org.springframework.data.domain.Page;


public interface StudyService {
    Page<SimpleStudyDto> findAllByStudySearchOption(StudySearchOption options);
    StudyDto findDetailByStudyId(Long studyId);
    StudyDto createStudyByStudyId(Long studyId);
    void removeStudyByStudyId(Long studyId);
    void shareStudyByStudyId(Long studyId);
    void updateStudyByStudyId(StudyDto studyDto);

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
