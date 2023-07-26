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

import com.ssafy.lighthouse.domain.study.dto.QnaDto;
import com.ssafy.lighthouse.domain.study.service.QnaService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("qna")
@AllArgsConstructor
public class QnaController extends HttpServlet {
	private static final String SUCCESS= "success";

	private QnaService qnaService;

	//추후 조회, 검색, 필터링 필요하면 추가

	@PostMapping
	public ResponseEntity<String> createQna(@RequestBody QnaDto.Req dto) {
		qnaService.createQna(dto);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@PutMapping("/{qna-id}")
	public ResponseEntity<String> updateQna(@PathVariable("qna-id") final Long id,
												@RequestBody QnaDto.Req dto) {
		qnaService.updateQna(id, dto);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@DeleteMapping("/{qna-id}")
	public ResponseEntity<String> removeQna(@PathVariable("qna-id") final Long id) {
		qnaService.removeQna(id);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
}
