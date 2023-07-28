package com.ssafy.lighthouse.domain.study.exception;

public class BookmarkException extends StudyException{
    public BookmarkException() {
        super("북마크 오류");
    }

    public BookmarkException(String message) {
        super("bookmark - " + message);
    }
}
