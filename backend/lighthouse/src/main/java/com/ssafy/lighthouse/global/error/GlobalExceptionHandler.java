package com.ssafy.lighthouse.global.error;

import com.ssafy.lighthouse.domain.study.exception.StudyException;
import com.ssafy.lighthouse.domain.study.exception.StudyNotFoundException;
import com.ssafy.lighthouse.domain.user.exception.UnAuthorizedException;
import com.ssafy.lighthouse.domain.user.exception.UserNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(UnAuthorizedException.class)
    public ResponseEntity<String> handleUnAuthorizedException(UnAuthorizedException e) {
        log.debug("handleUnAuthorizedException : {}", e.getMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(StudyNotFoundException.class)
    public ResponseEntity<String> handleStudyNotFoundException(StudyNotFoundException e) {
        log.debug("handleStudyNotFoundException : {}", e.getMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException e) {
        log.debug("handleUserNotFoundException : {}", e.getMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(StudyException.class)
    public ResponseEntity<String> handleStudyException(StudyException e) {
        log.debug("handleStudyException : {}", e.getMessage());
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NO_CONTENT);
    }
}
