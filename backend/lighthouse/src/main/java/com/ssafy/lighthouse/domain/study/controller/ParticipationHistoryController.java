package com.ssafy.lighthouse.domain.study.controller;

import com.ssafy.lighthouse.domain.study.service.ParticipationHistoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/participation-history")
@Slf4j
@RequiredArgsConstructor
public class ParticipationHistoryController {

    private final ParticipationHistoryService participationHistoryService;

    // 가입 신청
    @PostMapping("/{study-id}")
    public ResponseEntity<?> participateStudyByStudyId(@PathVariable(name = "study-id") Long studyId,
                                                       HttpServletRequest request) {
        log.debug("studyId : {}", studyId);
//         userId 가져오기
        Long userId = (Long) request.getAttribute("userId");
        participationHistoryService.participateStudy(studyId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 스터디 탈퇴
    @DeleteMapping("/{study-id}")
    public ResponseEntity<?> leaveStudyByStudyId(@PathVariable(name = "study-id") Long studyId,
                                                 HttpServletRequest request) {
        log.debug("studyId : {}", studyId);
        // userId 가져오기
        Long userId = (Long) request.getAttribute("userId");
        participationHistoryService.leaveStudy(studyId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    // 스터디 가입 수락
    @PutMapping("/{study-id}/{user-id}")
    public ResponseEntity<?> joinStudy(@PathVariable(name = "study-id") Long studyId,
                                                @PathVariable(name = "user-id") Long userId) {
        participationHistoryService.joinStudy(studyId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 스터디 참가 거절
    @DeleteMapping("/{study-id}/{user-id}")
    public ResponseEntity<?> rejectStudy(@PathVariable(name = "study-id") Long studyId,
                                                 @PathVariable(name = "user-id") Long userId) {
        participationHistoryService.rejectStudy(studyId, userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
