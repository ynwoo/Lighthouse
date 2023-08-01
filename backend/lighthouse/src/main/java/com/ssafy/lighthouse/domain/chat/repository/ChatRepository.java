package com.ssafy.lighthouse.domain.chat.repository;

import com.ssafy.lighthouse.domain.chat.entity.ChatRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRepository extends MongoRepository<ChatRecord, String> {
}
