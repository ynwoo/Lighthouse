package com.ssafy.lighthouse.domain.study.controller;

import com.ssafy.lighthouse.domain.study.dto.StudyDto;
import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;
import com.ssafy.lighthouse.domain.study.service.StudyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
@Slf4j
public class StudyController {

    private final StudyService studyService;

    // 검색 옵션에 대한 전체 조회
    @GetMapping
    public ResponseEntity<?> findAllByStudySearchOption(StudySearchOption options) {
        List<StudyDto> result = studyService.findAllByStudySearchOption(options);
        log.debug("findAllByStudySearchOption ---------- {}", result);
        return new ResponseEntity<List<StudyDto>>(result, HttpStatus.OK);
    }

    // 상세 조회
    @GetMapping("/{study-id}")
    public ResponseEntity<?> findDetailById(@PathVariable(name = "study-id") Long studyId) {
        log.debug("studyId : {}", studyId);
        StudyDto result = studyService.findDetailById(studyId);
        return new ResponseEntity<StudyDto>(result, HttpStatus.OK);
    }

    // 템플릿 복제
    @PostMapping("/{study-id}")
    public ResponseEntity<?> createStudyById(@PathVariable(name = "study-id") Long studyId) {
        log.debug("studyId : {}", studyId);
        StudyDto result = studyService.createStudyById(studyId);
        return new ResponseEntity<StudyDto>(result, HttpStatus.OK);
    }

    @PutMapping ("/{study-id}")
    public ResponseEntity<?> shareStudyById(@PathVariable(name = "study-id") Long studyId) {
        log.debug("studyId : {}", studyId);
//        studyService.shareStudyById(studyId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    // 스터디 삭제
    @DeleteMapping("/{study-id}")
    public ResponseEntity<?> removeStudyById(@PathVariable(name = "study-id") Long studyId) {
        log.debug("studyId : {}", studyId);
        studyService.removeStudyById(studyId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

}
