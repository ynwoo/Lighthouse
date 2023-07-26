package com.ssafy.lighthouse.domain.study.exception;

public class StudyLikeException extends StudyException {
    public StudyLikeException() {
        super("좋아요 오류");
    }

    public StudyLikeException(String message) {
        super("like - " + message);
    }
}
