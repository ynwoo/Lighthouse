package com.ssafy.lighthouse.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Configuration {
	@Value("${cloud.aws.credentials.accessKey}")
	private String accessKey;
	@Value("${cloud.aws.credentials.secretKey}")
	private String secretKey;
	@Value("${cloud.aws.region.static}")
	private String region;


	// @Bean
	// public AmazonS3Client amazonS3Client() {
	// 	AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
	//
	// 	return (AmazonS3Client) AmazonS3ClientBuilder.standard()
	// 		.withCredentials(new AWSStaticCredentialsProvider(credentials))
	// 		.withRegion(this.region)
	// 		.build();
	// }
}
