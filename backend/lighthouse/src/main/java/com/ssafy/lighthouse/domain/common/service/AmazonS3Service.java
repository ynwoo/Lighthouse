package com.ssafy.lighthouse.domain.common.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.ssafy.lighthouse.domain.common.exception.S3FileNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AmazonS3Service {
	public static final String CLOUNDFRONT_DOMAIN_NAME = "${CLOUDFRONT_DOMAIN_NAME}";
	private static final String FILE_EXTENSION_SEPARATOR = ".";
	private static final String FOLDER_SEPARATOR = "/";
	private static final String TIME_SEPARATOR = "_";
	private final AmazonS3Client amazonS3Client;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;



	public String upload(String category, MultipartFile file) {
		String filePath = buildFileName(category, file.getOriginalFilename());

		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentLength(file.getSize());
		objectMetadata.setContentType(file.getContentType());
		try {
			amazonS3Client.putObject(new PutObjectRequest(bucket, filePath, file.getInputStream(), objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
			log.debug("file upload success");
		} catch (Exception e) {
			e.printStackTrace();
			log.error("file upload fail", e);
		}
		//CloudFront 경로 리턴
		//return CLOUNDFRONT_DOMAIN_NAME + filePath;
		//S3 파일 경로 리턴
		return amazonS3Client.getUrl(bucket, filePath).toString();
	}

	public byte[] download(String filePath) {
		try {
			validateFileExists(filePath);

			S3Object s3Object = amazonS3Client.getObject(bucket, filePath);
			S3ObjectInputStream inputStream = s3Object.getObjectContent();
			log.debug("file download success");
			return IOUtils.toByteArray(inputStream);
		} catch (Exception e) {
			log.debug("file download fail", e);
			return null;
		}
	}

	public void delete(String filePath) {
		try {
			validateFileExists(filePath);
			amazonS3Client.deleteObject(bucket, filePath);
			log.debug("file delete success");
		} catch (Exception e) {
			log.debug("file delete fail", e);
		}
	}

	public static String buildFileName(String category, String originalFileName) {
		int fileExtensionIndex = originalFileName.lastIndexOf(FILE_EXTENSION_SEPARATOR);
		String fileExtension = originalFileName.substring(fileExtensionIndex);
		String fileName = originalFileName.substring(0, fileExtensionIndex);
		String now = String.valueOf(System.currentTimeMillis());

		return category + FOLDER_SEPARATOR + fileName + TIME_SEPARATOR + now + fileExtension;
	}

	private void validateFileExists(String filePath) {
		if (!amazonS3Client.doesObjectExist(bucket, filePath)) {
			throw new S3FileNotFoundException(filePath);
		}
	}
}
