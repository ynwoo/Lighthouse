package com.ssafy.lighthouse.domain.common.controller;

import java.nio.charset.StandardCharsets;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.lighthouse.domain.common.util.S3Utils;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("aws-s3")
public class FileController {
	private static final String FOLDER_SEPARATOR = "/";
	private static final int UNDER_BAR_INDEX = 1;
	private static final String SUCCESS = "success";
	private final S3Utils s3s3Utils;

	@PostMapping(name = "S3 파일 업로드", value = "/file")
	public ResponseEntity<?> uploadFile(@RequestPart("file") MultipartFile multipartFile) {
		String fileUrl = s3s3Utils.uploadFile("test", multipartFile);
		return new ResponseEntity<String>(fileUrl, HttpStatus.OK);
	}

	@GetMapping(name = "S3 파일 다운로드", value ="/file")
	public ResponseEntity<?> downloadFile(@RequestParam("filePath") String filePath) {
		byte[] data = s3s3Utils.downloadFile(filePath);

		ByteArrayResource resource = new ByteArrayResource(data);
		HttpHeaders headers = buildHeaders(filePath, data);

		return ResponseEntity
			.ok()
			.headers(headers)
			.body(resource);
	}

	@DeleteMapping(name = "S3 파일 삭제", value = "/file")
	public ResponseEntity<?> deleteFile(@RequestParam("filePath") String filePath) {
		s3s3Utils.deleteFile(filePath);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
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
