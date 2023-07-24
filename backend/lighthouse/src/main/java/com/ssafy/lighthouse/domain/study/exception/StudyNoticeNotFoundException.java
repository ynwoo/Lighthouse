package com.ssafy.lighthouse.domain.study.exception;

import lombok.Getter;

@Getter
public class StudyNoticeNotFoundException extends RuntimeException {
	private long id;

	public StudyNoticeNotFoundException(long id) {
		super("StudyNotice " + id + " is not found");
		this.id = id;
	}
}
