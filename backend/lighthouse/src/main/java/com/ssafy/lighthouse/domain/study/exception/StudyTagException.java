package com.ssafy.lighthouse.domain.study.exception;

public class StudyTagException extends StudyException {
    public StudyTagException() {
        super();
    }

    public StudyTagException(String message) {
        super("tag - " + message);
    }
}
