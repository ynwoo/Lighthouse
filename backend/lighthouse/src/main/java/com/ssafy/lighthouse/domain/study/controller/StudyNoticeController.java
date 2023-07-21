package com.ssafy.lighthouse.domain.study.controller;

import javax.servlet.http.HttpServlet;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.lighthouse.domain.study.dto.StudyNoticeDto;
import com.ssafy.lighthouse.domain.study.service.StudyNoticeService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("study-notice")
@AllArgsConstructor
public class StudyNoticeController extends HttpServlet {
	private static final String SUCCESS= "success";

	private StudyNoticeService studyNoticeService;

	@PostMapping
	public ResponseEntity<String> createNotice(@RequestBody StudyNoticeDto.StudyNoticeReq dto) {
		studyNoticeService.createNotice(dto);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@PutMapping("/{study-notice-id}")
	public ResponseEntity<String> updateNotice(@PathVariable("study-notice-id") final int id,
												@RequestBody StudyNoticeDto.StudyNoticeReq dto) {
		studyNoticeService.updateNotice(id, dto);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@DeleteMapping("/{study-notice-id}")
	public ResponseEntity<String> removeNotice(@PathVariable("study-notice-id") final int id) {
		studyNoticeService.removeNotice(id);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
}
