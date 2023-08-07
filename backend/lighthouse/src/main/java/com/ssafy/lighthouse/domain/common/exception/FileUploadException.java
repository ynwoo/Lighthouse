package com.ssafy.lighthouse.domain.common.exception;

public class FileUploadException extends RuntimeException{
    public FileUploadException() {
        super("file upload error");
    }

    public FileUploadException(String message) {
        super(message);
    }
}
