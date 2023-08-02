package com.ssafy.lighthouse.domain.common.controller;

import org.springframework.stereotype.Controller;

import com.ssafy.lighthouse.domain.common.service.AmazonS3Service;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class FileController {
	private AmazonS3Service s3Service;


}
