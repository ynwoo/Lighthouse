package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.*;
import com.ssafy.lighthouse.domain.study.entity.*;
import com.ssafy.lighthouse.domain.study.exception.*;
import com.ssafy.lighthouse.domain.study.repository.*;
import com.ssafy.lighthouse.global.util.ERROR;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
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
    public List<SimpleStudyDto> findAllByStudySearchOption(StudySearchOption options) {
        return studyRepository.findAllByStudySearchOption(options);
    }

    // 결과값이 null 이면 StudyNotFoundException을 전달한다.
    @Override
    public StudyDto findDetailByStudyId(Long studyId) {
        Optional<Study> result = studyRepository.findDetailById(studyId);
        log.debug("service - studyId : {}", studyId);
        log.debug("service - findDetailById : {}", result);
        return new StudyDto(result.orElseThrow(() -> new StudyNotFoundException(ERROR.FIND)));
    }

    @Override
    public StudyDto createStudyByStudyId(Long studyId) {
        Optional<Study> findDetail = studyRepository.findDetailShareById(studyId);
        log.debug("service1 - findDetailById : {}", findDetail);
        Study study = findDetail.orElseThrow(() -> new StudyNotFoundException(ERROR.CREATE));
        study.resetId();
        studyRepository.save(study);
        log.debug("service2 - studyId : {}", study.getId());
        log.debug("service3 - studyTag : {}", study.getStudyTags().stream().map(StudyTag::getStudyId).collect(Collectors.toList()));
//        StudyDto studyDto = new StudyDto(study);
//        em.flush();
//        em.clear();
//
//        Study newStudy = studyDto.toEntity();
//
//        // studyTag 넣기
//        studyTagRepository.saveAll(newStudy.getStudyTags());
////        // studyMaterial 넣기
////        studyMaterialRepository.saveAll(newStudy.getStudyMaterials());
////        // studyNotice 넣기
////        studyNoticeRepository.saveAll(newStudy.getStudyNotices());
//        // session 넣기
//        sessionRepository.saveAll(newStudy.getSessions());
//
//        // study 넣기
//        studyRepository.save(newStudy);
        Long id = study.getId();

        em.flush();
        em.clear();

        Study result = studyRepository.findDetailShareById(id).orElseThrow(() -> new StudyNotFoundException(ERROR.CREATE));
        return new StudyDto(result);
    }

//    @Override
//    public StudyDto createStudyByStudyId(Long studyId) {
//        Optional<Study> findDetail = studyRepository.findDetailById(studyId);
//        log.debug("service - findDetailById : {}", findDetail);
//        Study study = findDetail.orElseThrow(() -> new StudyNotFoundException(ERROR.CREATE));
//
//        StudyDto studyDto = new StudyDto(study);
//        em.flush();
//        em.clear();
//
//        Study newStudy = studyDto.toEntity();
//
//        // studyTag 넣기
//        studyTagRepository.saveAll(newStudy.getStudyTags());
////        // studyMaterial 넣기
////        studyMaterialRepository.saveAll(newStudy.getStudyMaterials());
////        // studyNotice 넣기
////        studyNoticeRepository.saveAll(newStudy.getStudyNotices());
//        // session 넣기
//        sessionRepository.saveAll(newStudy.getSessions());
//
//        // study 넣기
//        studyRepository.save(newStudy);
//        Long id = newStudy.getId();
//
//        em.flush();
//        em.clear();
//
//        Study result = studyRepository.findDetailById(id).orElseThrow(() -> new StudyNotFoundException(ERROR.CREATE));
//        return new StudyDto(result);
//    }

    @Override
    public void removeStudyByStudyId(Long studyId) {
        Optional<Study> result = studyRepository.findById(studyId);
        Study study = result.orElseThrow(() -> new StudyNotFoundException(ERROR.REMOVE));
        study.remove();
    }

    @Override
    public void shareStudyById(Long studyId) {
        Optional<Study> result = studyRepository.findById(studyId);
        Study study = result.orElseThrow(() -> new StudyNotFoundException(ERROR.UPDATE));
//        study.share();
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
