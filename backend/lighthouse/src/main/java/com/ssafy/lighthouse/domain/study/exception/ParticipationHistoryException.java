package com.ssafy.lighthouse.domain.study.exception;

public class ParticipationHistoryException extends StudyException{
    public ParticipationHistoryException() {
        super();
    }

    public ParticipationHistoryException(String message) {
        super("ParticipationHistory - " + message);
    }
}
