package com.ssafy.lighthouse.domain.study.controller;

import javax.servlet.http.HttpServlet;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.lighthouse.domain.study.dto.StudyNoticeDto;
import com.ssafy.lighthouse.domain.study.repository.StudyNoticeRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class StudyNoticeController extends HttpServlet {

	private static final String SUCCESS= "success";

	@PostMapping
	public ResponseEntity<String> addNotice(@RequestBody StudyNoticeDto studyNotice) {
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@PutMapping
	public ResponseEntity<String> modifyNotice(@RequestBody StudyNoticeDto studyNotice) {
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
	@DeleteMapping
	public ResponseEntity<String> deleteNotice(@RequestBody StudyNoticeDto studyNotice) {
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
}
