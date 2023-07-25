package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.StudyDto;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;
import com.ssafy.lighthouse.domain.study.entity.Study;
import com.ssafy.lighthouse.domain.study.exception.StudyNotFoundException;
import com.ssafy.lighthouse.domain.study.repository.StudyEvalRepository;
import com.ssafy.lighthouse.domain.study.repository.StudyRepository;
import com.ssafy.lighthouse.domain.study.repository.StudyTagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService {
    private final StudyRepository studyRepository;
    private final StudyTagRepository studyTagRepository;
    private final StudyEvalRepository studyEvalRepository;
    private final EntityManager em;

    @Override
    public List<StudyDto> findAllByStudySearchOption(StudySearchOption options) {
        return studyRepository.findAllByStudySearchOption(options);
    }

    // 결과값이 null 이면 StudyNotFoundException을 전달한다.
    @Override
    public StudyDto findDetailById(Long studyId) {
        Optional<Study> result = studyRepository.findDetailById(studyId);
        log.debug("service - studyId : {}", studyId);
        log.debug("service - findDetailById : {}", result);
        return new StudyDto(result.orElseThrow(StudyNotFoundException::new));
    }

    @Override
    public StudyDto createById(Long studyId) {
        Optional<Study> findDetail = studyRepository.findDetailById(studyId);
        log.debug("service - findDetailById : {}", findDetail);
        Study study = findDetail.orElseThrow(StudyNotFoundException::new);
        StudyDto studyDto = new StudyDto(study);
        Study newStudy = studyDto.toEntity();

        // study 넣기
        studyRepository.save(newStudy);

        // studyTag 넣기
        studyTagRepository.saveAll(newStudy.getStudyTags());

        // studyEval 넣기
        studyEvalRepository.saveAll(newStudy.getStudyEvals());

        Long id = newStudy.getId();
        em.flush();
        em.clear();

        Study result = studyRepository.findDetailById(id).orElseThrow(StudyNotFoundException::new);
        return new StudyDto(result);
    }
}
