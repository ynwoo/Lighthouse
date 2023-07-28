package com.ssafy.lighthouse.domain.study.exception;

import lombok.Getter;

@Getter
public class StudyMaterialNotFoundException extends RuntimeException {
	private long id;

	public StudyMaterialNotFoundException(long id) {
		super("StudyMaterial " + id + " is not found");
		this.id = id;
	}
}
