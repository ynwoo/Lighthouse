package com.ssafy.lighthouse.domain.heartbeat.repository;

import com.ssafy.lighthouse.domain.heartbeat.entity.Heartbeat;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HeartbeatRepository extends MongoRepository<Heartbeat, Long> {
}
