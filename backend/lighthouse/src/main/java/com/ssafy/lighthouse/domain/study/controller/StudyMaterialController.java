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

import com.ssafy.lighthouse.domain.study.dto.StudyMaterialDto;
import com.ssafy.lighthouse.domain.study.service.StudyMaterialService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("study-material")
@AllArgsConstructor
public class StudyMaterialController extends HttpServlet {
	private static final String SUCCESS= "success";

	private StudyMaterialService studyMaterialService;

	@PostMapping
	public ResponseEntity<String> createMaterial(@RequestBody StudyMaterialDto.StudyMaterialReq dto) {
		studyMaterialService.createMaterial(dto);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@PutMapping("/{study-material-id}")
	public ResponseEntity<String> updateMaterial(@PathVariable("study-material-id") final Long id,
												@RequestBody StudyMaterialDto.StudyMaterialReq dto) {
		studyMaterialService.updateMaterial(id, dto);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@DeleteMapping("/{study-material-id}")
	public ResponseEntity<String> removeMaterial(@PathVariable("study-material-id") final Long id) {
		studyMaterialService.removeMaterial(id);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}
}
