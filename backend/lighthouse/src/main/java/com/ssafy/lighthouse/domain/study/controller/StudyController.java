package com.ssafy.lighthouse.domain.study.controller;

import com.ssafy.lighthouse.domain.study.dto.*;
import com.ssafy.lighthouse.domain.study.service.StudyService;
import com.ssafy.lighthouse.domain.user.exception.UnAuthorizedException;
import com.ssafy.lighthouse.domain.user.service.JwtService;
import com.ssafy.lighthouse.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/study")
@RequiredArgsConstructor
@Slf4j
public class StudyController {

    private final StudyService studyService;
    private final JwtService jwtService;
    private final UserService userService;

    // 검색 옵션에 대한 전체 조회
    @GetMapping
    public ResponseEntity<?> findAllByStudySearchOption(StudySearchOption options) {
        log.debug("options : {}", options);
        Page<SimpleStudyDto> result = studyService.findAllByStudySearchOption(options);
        log.debug("findAllByStudySearchOption ---------- {}", result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 상세 조회
    @GetMapping("/{study-id}")
    public ResponseEntity<?> findDetailByStudyId(@PathVariable(name = "study-id") Long studyId,
                                                 HttpServletRequest request) {
        // token 확인
        getToken(request);

        log.debug("studyId : {}", studyId);
        StudyResponse result = studyService.findDetailByStudyId(studyId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 템플릿 복제
    @PostMapping("/{study-id}")
    public ResponseEntity<?> createStudyByStudyId(@PathVariable(name = "study-id") Long studyId) {
        log.debug("studyId : {}", studyId);
        StudyResponse result = studyService.createStudyByStudyId(studyId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 스터디 공유
    @PutMapping ("/{study-id}")
    public ResponseEntity<?> shareStudyByStudyId(@PathVariable(name = "study-id") Long studyId) {
        log.debug("studyId : {}", studyId);
        studyService.shareStudyByStudyId(studyId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    // 스터디 정보 수정
    @PutMapping
    public ResponseEntity<?> updateStudy(@RequestBody StudyRequest studyRequest,
                                         HttpServletRequest request) {
        Long userId = getUserId(request);
        log.debug("studyId : {}", studyRequest.getId());
        studyService.updateStudyByStudyId(studyRequest, userId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    // 스터디 삭제
    @DeleteMapping("/{study-id}")
    public ResponseEntity<?> removeStudyByStudyId(@PathVariable(name = "study-id") Long studyId) {
        log.debug("studyId : {}", studyId);
        studyService.removeStudyByStudyId(studyId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/like/{study-id}")
    public ResponseEntity<?> createStudyLike(@PathVariable(name = "study-id") Long studyId,
                                             HttpServletRequest request) {
        // session에서 userId 가져오기
        Long userId = getUserId(request);
        log.debug("userId : {}", userId);
        studyService.createStudyLike(studyId, userId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/like/{study-id}")
    public ResponseEntity<?> removeStudyLike(@PathVariable(name = "study-id") Long studyId,
                                             HttpServletRequest request) {
        // session에서 userId 가져오기
        Long userId = getUserId(request);
        log.debug("userId : {}", userId);
        studyService.removeStudyLike(studyId, userId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/bookmark/{study-id}")
    public ResponseEntity<?> createStudyBookmark(@PathVariable(name = "study-id") Long studyId,
                                                 HttpServletRequest request) {
        // session에서 userId 가져오기
        Long userId = getUserId(request);
        log.debug("userId : {}", userId);
        studyService.createStudyBookmark(studyId, userId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/bookmark/{study-id}")
    public ResponseEntity<?> removeStudyBookmark(@PathVariable(name = "study-id") Long studyId,
                                                 HttpServletRequest request) {
        // session에서 userId 가져오기
        Long userId = getUserId(request);
        log.debug("userId : {}", userId);
        studyService.removeStudyBookmark(studyId, userId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/tag")
    public ResponseEntity<?> createStudyTag(@RequestBody StudyTagDto studyTagDto) {
        log.debug("studyId : {}, tagId : {}", studyTagDto.getStudyId(), studyTagDto.getTag().getId());
        studyService.createStudyTag(studyTagDto);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/tag/{study-id}/{tag-id}")
    public ResponseEntity<?> removeStudyTag(@PathVariable(name = "study-id") Long studyId,
                                            @PathVariable(name = "tag-id") Long tagId) {
        studyService.removeStudyTag(studyId, tagId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping("/eval")
    public ResponseEntity<?> createStudyEval(@RequestBody StudyEvalDto studyEvalDto,
                                             HttpServletRequest request) {
        // session에서 userId 가져오기
        Long userId = getUserId(request);
        log.debug("userId : {}", userId);
        studyEvalDto.setUserId(userId);
        studyService.createStudyEval(studyEvalDto);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/eval/{study-id}")
    public ResponseEntity<?> removeStudyEval(@PathVariable(name = "study-id") Long studyId,
                                             HttpServletRequest request) {
//         session에서 userId 가져오기
        Long userId = getUserId(request);
        log.debug("userId : {}", userId);
        studyService.removeStudyEval(studyId, userId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    private String getToken(HttpServletRequest request) {
        // header에서 토큰 가져오기
        String token = request.getHeader("access-token");
        if (jwtService.checkToken(token)) {
            log.info("사용 가능한 토큰!!!");

            // 로그인 사용자의 id 리턴
            return token;
        }
        // 사용 불가능한 토큰이면 예외처리
        throw new UnAuthorizedException();
    }

    private Long getUserId(HttpServletRequest request) {
        return jwtService.getIdByToken(getToken(request));
    }

}
