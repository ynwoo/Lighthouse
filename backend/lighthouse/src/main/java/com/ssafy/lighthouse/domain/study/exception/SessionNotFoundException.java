package com.ssafy.lighthouse.domain.study.exception;

import lombok.Getter;

@Getter
public class SessionNotFoundException extends RuntimeException {
	private long id;

	public SessionNotFoundException(long id) {
		super("Session " + id + " is not found");
		this.id = id;
	}
}
