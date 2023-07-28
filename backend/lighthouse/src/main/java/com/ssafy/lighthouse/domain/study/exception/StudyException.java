package com.ssafy.lighthouse.domain.study.exception;

public class StudyException extends RuntimeException{
    public StudyException() {
        super("study error");
    }

    public StudyException(String message) {
        super("study - " + message);
    }
}
