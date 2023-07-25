package com.ssafy.lighthouse.domain.study.exception;

public class StudyNotFoundException extends RuntimeException{
    public StudyNotFoundException() {
        super("스터디를 찾을 수 없습니다.");
    }

    public StudyNotFoundException(String message) {
        super(message);
    }
}
