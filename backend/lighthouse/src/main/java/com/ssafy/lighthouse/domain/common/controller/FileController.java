package com.ssafy.lighthouse.domain.common.controller;

import java.nio.charset.StandardCharsets;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.lighthouse.domain.common.service.AmazonS3Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("aws-s3")
public class FileController {
	private static final String FOLDER_SEPARATOR = "/";
	private static final int UNDER_BAR_INDEX = 1;
	private AmazonS3Service s3Service;

	@PostMapping(name = "S3 파일 업로드", value = "/file")
	public String uploadFile(@RequestParam("file") MultipartFile multipartFile) {
		s3Service.upload("test", multipartFile);
		return "success";
	}

	@GetMapping(name = "S3 파일 다운로드", value ="/file")
	public ResponseEntity<ByteArrayResource> downloadFile(@RequestParam("filePath") String filePath) {
		byte[] data = s3Service.download(filePath);
		ByteArrayResource resource = new ByteArrayResource(data);
		HttpHeaders headers = buildHeaders(filePath, data);

		return ResponseEntity
			.ok()
			.headers(headers)
			.body(resource);
	}

	@DeleteMapping(name = "S3 파일 삭제", value = "/file")
	public String deleteFile(@RequestParam("path") String filePath) {
		s3Service.delete(filePath);
		return "success";
	}

	private HttpHeaders buildHeaders(String resourcePath, byte[] data) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentLength(data.length);
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDisposition(createContentDisposition(resourcePath));
		return headers;
	}
	public static ContentDisposition createContentDisposition(String categoryWithFileName) {
		String fileName = categoryWithFileName.substring(
			categoryWithFileName.lastIndexOf(FOLDER_SEPARATOR) + UNDER_BAR_INDEX);
		return ContentDisposition.builder("attachment")
			.filename(fileName, StandardCharsets.UTF_8)
			.build();
	}
}
