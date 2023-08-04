package com.ssafy.lighthouse.domain.common.exception;

public class BadgeException extends RuntimeException{
    public BadgeException() {
        super("badge error");
    }

    public BadgeException(String message) {
        super(message);
    }
}
