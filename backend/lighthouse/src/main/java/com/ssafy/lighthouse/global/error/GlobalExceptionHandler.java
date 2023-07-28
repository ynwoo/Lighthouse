package com.ssafy.lighthouse.global.error;

import com.ssafy.lighthouse.domain.study.exception.StudyNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(StudyNotFoundException.class)
    public ResponseEntity<?> handleStudyNotFoundException(StudyNotFoundException e) {
        log.debug("handleStudyNotFoundException : {}", e.getMessage());
        return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}
