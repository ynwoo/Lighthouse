package com.ssafy.lighthouse.domain.chat.service;

import com.ssafy.lighthouse.domain.chat.entity.ChatRecord;
import com.ssafy.lighthouse.domain.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
@Slf4j
public class ChatService {

    private final ChatRepository chatRepository;

    public ChatRecord getAllMessage(String id) {
        log.debug("get all chats by the id: " + id);
        ChatRecord record;

        try {
            record = chatRepository.findById(id).get();
        } catch (NoSuchElementException e) {
            log.debug("no chat record found: ", e);
            record = ChatRecord.create(id);
            chatRepository.save(record);
        }

        return record;


    }

}
