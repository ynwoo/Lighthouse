package com.ssafy.lighthouse.domain.common.exception;

import lombok.Getter;

@Getter
public class S3FileNotFoundException extends RuntimeException {
	private String filePath;

	public S3FileNotFoundException(String filePath) {
		super("File " + filePath + " is not found");
		this.filePath = filePath;
	}
}
