package com.ssafy.lighthouse.domain.user.repository;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.lighthouse.domain.user.entity.AlertQueue;

@WebAppConfiguration
@SpringBootTest
@Transactional
class AlertQueueRepositoryTest {
	private AlertQueueRepository alertQueueRepository;

	@Autowired
	public AlertQueueRepositoryTest(AlertQueueRepository alertQueueRepository) {
		this.alertQueueRepository = alertQueueRepository;
	}

	// @Test
	// public void testGetAlertQueue() {
	// 	List<AlertQueue> alertQueueList = alertQueueRepository.findByConsumerIdAndIsValidOrderByCreatedAtDesc(
	// 		1L, 1);
	//
	// 	for (AlertQueue aq : alertQueueList) {
	// 		System.out.println(aq);
	// 	}
	// }
}