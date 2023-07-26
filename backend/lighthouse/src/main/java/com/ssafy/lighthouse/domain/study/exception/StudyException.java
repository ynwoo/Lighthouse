package com.ssafy.lighthouse.domain.study.exception;

public class StudyException extends RuntimeException{
    public StudyException() {
        super("스터디 오류");
    }

    public StudyException(String message) {
        super("study - " + message);
    }
}
