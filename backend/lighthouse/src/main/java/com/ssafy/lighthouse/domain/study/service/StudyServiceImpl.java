package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.*;
import com.ssafy.lighthouse.domain.study.entity.*;
import com.ssafy.lighthouse.domain.study.exception.*;
import com.ssafy.lighthouse.domain.study.repository.*;
import com.ssafy.lighthouse.global.util.ERROR;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService {
    private final StudyRepository studyRepository;
    private final StudyTagRepository studyTagRepository;
    private final StudyMaterialRepository studyMaterialRepository;
    private final StudyNoticeRepository studyNoticeRepository;
    private final SessionRepository sessionRepository;
    private final StudyLikeRepository studyLikeRepository;
    private final BookmarkRepository bookmarkRepository;
    private final StudyEvalRepository studyEvalRepository;
    private final EntityManager em;


    @Override
    public Page<SimpleStudyDto> findAllByStudySearchOption(StudySearchOption options) {
        return studyRepository.findAllByStudySearchOption(options);
    }

    // 결과값이 null 이면 StudyNotFoundException을 전달한다.
    @Override
    public StudyResponse findDetailByStudyId(Long studyId) {
        Optional<Study> result = studyRepository.findDetailById(studyId);
        log.debug("service - studyId : {}", studyId);
        log.debug("service - findDetailById : {}", result);
        return new StudyResponse(result.orElseThrow(() -> new StudyNotFoundException(ERROR.FIND)));
    }

    @Override
    public StudyResponse createStudyByStudyId(Long studyId) {
        Optional<Study> findDetail = studyRepository.findSimpleDetailById(studyId);
        log.debug("service1 - findDetailById : {}", findDetail);
        Study study = findDetail.orElseThrow(() -> new StudyNotFoundException(ERROR.CREATE));
        
        // 새로운 스터디 만들기
        Study newStudy = studyRepository.save(Study.builder()
                .title(study.getTitle())
                .description(study.getDescription())
                .hit(study.getHit())
                .rule(study.getRule())
                .isOnline(study.getIsOnline())
                .original(study)
                .build());

        log.debug("service2 - studyId : {}", study.getId());
        log.debug("service3 - savedStudyId : {}", newStudy.getId());
        
        // newStudyId
        Long newStudyId = newStudy.getId();
        // studyTag 넣기
        studyTagRepository.saveAll(study.getStudyTags()
                .stream()
                .map(studyTag -> StudyTag.builder()
                        .studyId(newStudyId)
                        .tagId(studyTag.getTagId())
                        .build())
                .collect(Collectors.toSet()));

        // studyMaterial 넣기
        studyMaterialRepository.saveAll(study.getStudyMaterials()
                .stream()
                .map(studyMaterial -> StudyMaterial.builder()
                        .studyId(newStudyId)
                        .content(studyMaterial.getContent())
                        .type(studyMaterial.getType())
                        .fileUrl(studyMaterial.getFileUrl())
                        .build())
                .collect(Collectors.toSet()));

        // studyNotice 넣기
        studyNoticeRepository.saveAll(study.getStudyNotices()
                .stream()
                .map(studyNotice -> StudyNotice.builder()
                        .studyId(newStudyId)
                        .content(studyNotice.getContent())
                        .build())
                .collect(Collectors.toSet()));

        // session 넣기
        sessionRepository.saveAll(study.getSessions()
                .stream()
                .map(session -> Session.builder()
                        .studyId(newStudyId)
                        .title(session.getTitle())
                        .description(session.getDescription())
                        .comment(session.getComment())
                        .seqNum(session.getSeqNum())
                        .build())
                .collect(Collectors.toSet()));

        em.flush();
        em.clear();

        Study result = studyRepository.findDetailById(newStudyId).orElseThrow(() -> new StudyNotFoundException(ERROR.CREATE));
        return new StudyResponse(result);
    }

    @Override
    public void removeStudyByStudyId(Long studyId) {
        Optional<Study> result = studyRepository.findById(studyId);
        Study study = result.orElseThrow(() -> new StudyNotFoundException(ERROR.REMOVE));
        study.remove();
    }

    @Override
    public void shareStudyByStudyId(Long studyId) {
        Optional<Study> result = studyRepository.findById(studyId);
        Study study = result.orElseThrow(() -> new StudyNotFoundException(ERROR.UPDATE));
        study.share();
    }

    @Override
    public void updateStudyByStudyId(StudyRequest studyRequest) {
//        Optional<Study> result = studyRepository.findDetailById(studyRequest.getId());
//        Study study = result.orElseThrow(() -> new StudyNotFoundException(ERROR.UPDATE));
//        log.debug("studyId : {}", study.getId());
        Study study = studyRequest.toEntity();
        studyRepository.save(study);
        log.debug("studyId : {}", study.getId());
    }

    @Override
    public void createStudyLike(Long studyId, Long userId) {
        Optional<StudyLike> result = studyLikeRepository.find(studyId, userId);
        if(result.isPresent()) {
            throw new StudyLikeException(ERROR.CREATE);
        }
        studyLikeRepository.save(new StudyLike(studyId, userId));
    }

    @Override
    public void removeStudyLike(Long studyId, Long userId) {
        Optional<StudyLike> result = studyLikeRepository.find(studyId, userId);
        result.orElseThrow(() -> new StudyLikeException(ERROR.REMOVE)).remove();
    }

    @Override
    public void createStudyBookmark(Long studyId, Long userId) {
        Optional<Bookmark> result = bookmarkRepository.find(studyId, userId);
        if(result.isPresent()) {
            throw new BookmarkException(ERROR.CREATE);
        }
        bookmarkRepository.save(new Bookmark(studyId, userId));
    }

    @Override
    public void removeStudyBookmark(Long studyId, Long userId) {
        Optional<Bookmark> result = bookmarkRepository.find(studyId, userId);
        result.orElseThrow(() -> new StudyLikeException(ERROR.REMOVE)).remove();
    }

    @Override
    public void createStudyEval(StudyEvalDto studyEvalDto) {
        Optional<StudyEval> result = studyEvalRepository.find(studyEvalDto.getStudyId(), studyEvalDto.getUserId());
        if(result.isPresent()) {
            throw new StudyEvalException(ERROR.CREATE);
        }
        studyEvalRepository.save(studyEvalDto.toEntity());
    }

    @Override
    public void removeStudyEval(Long studyId, Long userId) {
        Optional<StudyEval> result = studyEvalRepository.find(studyId, userId);
        result.orElseThrow(() -> new StudyEvalException(ERROR.REMOVE)).remove();
    }

    @Override
    public void createStudyTag(StudyTagDto studyTagDto) {
        Optional<StudyTag> result = studyTagRepository.find(studyTagDto.getStudyId(), studyTagDto.getTagId());
        if(result.isPresent()) {
            throw new StudyTagException(ERROR.CREATE);
        }
        studyTagRepository.save(studyTagDto.toEntity());
    }

    @Override
    public void removeStudyTag(Long studyId, Long tagId) {
        Optional<StudyTag> result = studyTagRepository.find(studyId, tagId);
        result.orElseThrow(() -> new StudyTagException(ERROR.REMOVE)).remove();
    }
}
