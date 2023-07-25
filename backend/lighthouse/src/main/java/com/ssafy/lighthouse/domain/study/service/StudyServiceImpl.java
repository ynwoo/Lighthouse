package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.StudyDto;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;
import com.ssafy.lighthouse.domain.study.exception.StudyNotFoundException;
import com.ssafy.lighthouse.domain.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService {
    private final StudyRepository studyRepository;

    @Override
    public List<StudyDto> findAllByStudySearchOption(StudySearchOption options) {
        return studyRepository.findAllByStudySearchOption(options);
    }

    // 결과값이 null 이면 StudyNotFoundException을 전달한다.
    @Override
    public StudyDto findDetailById(Long studyId) {
//        Optional<Study> result = studyRepository.findDetailById(studyId);
//        log.debug("service - findDetailById : {}", result);
//        return new StudyDto(result.orElseThrow(StudyNotFoundException::new));
        Optional<StudyDto> result = studyRepository.findDetailById(studyId);
        return result.orElseThrow(StudyNotFoundException::new);
    }

    @Override
    public StudyDto createById(Long studyId) {
//        Optional<Study> result = studyRepository.findDetailById(studyId);
//        log.debug("service - findDetailById : {}", result);
//        Study study = result.orElseThrow(StudyNotFoundException::new);
//        Study save = studyRepository.save(study);
//        log.debug("service - createById {}", new StudyDto(save));
//        return new StudyDto(save);
        return null;
    }
}
