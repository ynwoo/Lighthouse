package com.ssafy.lighthouse.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.user.entity.AlertQueue;

public interface AlertQueueRepository extends JpaRepository<AlertQueue, Long> {

	List<AlertQueue> findByConsumerIdAndIsValidOrderByCreatedAtDesc(Long consumerId, int isValid);
}
