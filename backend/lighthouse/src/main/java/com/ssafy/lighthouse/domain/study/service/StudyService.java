package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.common.dto.BadgeRequest;
import com.ssafy.lighthouse.domain.study.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface StudyService {
    Page<SimpleStudyDto> findAllByStudySearchOption(StudySearchOption options);
    Page<SimpleStudyDto> findAllByOriginalId(Long originalId, StudySearchOption options);
    StudyResponse findDetailByStudyId(Long studyId);
    StudyResponse createStudyByStudyId(Long studyId, Long userId);
    void removeStudyByStudyId(Long studyId);
    void shareStudyByStudyId(Long studyId);
    StudyResponse updateStudyByStudyId(StudyRequest studyRequest);

    // study-like
    void createStudyLike(Long studyId, Long userId);
    void removeStudyLike(Long studyId, Long userId);
    List<Long> findStudyLikeAllByUserId(Long userId);

    // study-bookmark
    void createStudyBookmark(Long studyId, Long userId);
    void removeStudyBookmark(Long studyId, Long userId);

    // study-eval
    void createStudyEval(StudyEvalDto studyEvalDto);
    void removeStudyEval(Long studyId, Long userId);

    // study-tag
    void createStudyTag(StudyTagDto studyTagDto);
    void removeStudyTag(Long studyId, Long tagId);

    // study-badge
    void updateStudyBadge(BadgeRequest badgeRequest, Long prevBadgeId);

}
