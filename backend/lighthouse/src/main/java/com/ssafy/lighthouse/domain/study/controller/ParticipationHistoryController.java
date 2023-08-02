package com.ssafy.lighthouse.domain.study.controller;

import com.ssafy.lighthouse.domain.study.service.ParticipationHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/participation-history")
@Slf4j
@RequiredArgsConstructor
public class ParticipationHistoryController {

    private final ParticipationHistoryService participationHistoryService;

    // 가입 신청
    @PostMapping("/{study-id}")
    public ResponseEntity<?> participateStudyByStudyId(@PathVariable(name = "study-id") Long studyId) {
        log.debug("studyId : {}", studyId);
//         userId 가져오기
        Long userId = getUserId();
        participationHistoryService.participateStudy(studyId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    // 스터디 가입
    @PutMapping("/{study-id}")
    public ResponseEntity<?> joinStudyByStudyId(@PathVariable(name = "study-id") Long studyId) {
        log.debug("studyId : {}", studyId);
        // userId 가져오기
        Long userId = getUserId();
        participationHistoryService.joinStudy(studyId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    // 스터디 탈퇴
    @DeleteMapping("/{study-id}")
    public ResponseEntity<?> leaveStudyByStudyId(@PathVariable(name = "study-id") Long studyId) {
        log.debug("studyId : {}", studyId);
        // userId 가져오기
        Long userId = getUserId();
        participationHistoryService.leaveStudy(studyId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public Long getUserId() {
        return 1L;
    }
}
