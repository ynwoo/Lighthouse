package com.ssafy.lighthouse.domain.user.exception;

public class AccessTokenException extends RuntimeException{
    public AccessTokenException() {
        super("access token error");
    }

    public AccessTokenException(String message) {
        super(message);
    }
}
