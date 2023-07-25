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

import com.ssafy.lighthouse.domain.study.dto.SessionDto;
import com.ssafy.lighthouse.domain.study.service.SessionService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("session")
@AllArgsConstructor
public class SessionController extends HttpServlet {
	private static final String SUCCESS= "success";

	private SessionService sessionService;

	@PostMapping
	public ResponseEntity<String> createSession(@RequestBody SessionDto.SessionReq dto) {
		sessionService.createSession(dto);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@PutMapping("/{session-id}")
	public ResponseEntity<String> updateSession(@PathVariable("session-id") final Long id,
												@RequestBody SessionDto.SessionReq dto) {
		sessionService.updateSession(id, dto);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@DeleteMapping("/{session-id}")
	public ResponseEntity<String> removeSession(@PathVariable("session-id") final Long id) {
		sessionService.removeSession(id);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
}
