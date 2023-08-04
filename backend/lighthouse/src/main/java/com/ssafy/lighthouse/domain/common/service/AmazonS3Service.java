package com.ssafy.lighthouse.domain.common.service;

import java.io.IOException;
import java.util.UUID;

import com.ssafy.lighthouse.domain.common.exception.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AmazonS3Service {
	public static final String CLOUNDFRONT_DOMAIN_NAME = "${CLOUDFRONT_DOMAIN_NAME}";
	private AmazonS3Client amazonS3Client;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;



	public String upload(MultipartFile file) {
		String originalFileName = file.getOriginalFilename();
		String filePath = getFilePath(originalFileName);
		log.debug("filePath : {}", filePath);

		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentLength(file.getSize());
		objectMetadata.setContentType(file.getContentType());

		try {
			amazonS3Client.putObject(
				new PutObjectRequest(bucket, filePath, file.getInputStream(), objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (IOException e) {
			e.printStackTrace();
			log.error("Filed upload fail", e);
		}
		return CLOUNDFRONT_DOMAIN_NAME + filePath;
		//S3 파일 경로 리턴
		//return s3Client.getUrl(bucket, fileName).toString();
		//CloudFront 경로 리턴

	}

	public String delete(String filePath) {
		String result = "success";
		try {
			boolean isObjectExist = amazonS3Client.doesObjectExist(bucket, filePath);
			if (isObjectExist) {
				amazonS3Client.deleteObject(bucket, filePath);
			} else {
				result = "File not found";
			}
		} catch (Exception e) {
			log.debug("Delete File failed", e);
		}
		return result;
	}

	public String getFilePath(String originalFileName) {
		if(originalFileName == null) throw new FileUploadException();
		return UUID.randomUUID() +
				originalFileName.substring(originalFileName.lastIndexOf("."));
	}
}
