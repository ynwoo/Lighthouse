package com.ssafy.lighthouse.domain.study.exception;

public class StudyEvalException extends StudyException{
    public StudyEvalException() {
        super("스터디 평가 오류");
    }

    public StudyEvalException(String message) {
        super("eval - " + message);
    }
}
