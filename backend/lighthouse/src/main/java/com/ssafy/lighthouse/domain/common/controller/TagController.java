package com.ssafy.lighthouse.domain.common.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.lighthouse.domain.common.service.TagService;

@RestController
@RequestMapping("/tags")
public class TagController {

	TagService tagService;

	@Autowired
	public TagController(TagService tagService) {
		this.tagService = tagService;
	}

	@GetMapping()
	public ResponseEntity<?> getTagList() {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;
		resultMap.put("tagList", tagService.getAllTag());
		return new ResponseEntity<>(resultMap, status);
	}
}