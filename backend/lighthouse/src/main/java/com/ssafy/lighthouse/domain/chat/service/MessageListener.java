package com.ssafy.lighthouse.domain.chat.service;

import com.ssafy.lighthouse.config.KafkaConstants;
import com.ssafy.lighthouse.domain.chat.dto.MessageDto;
import com.ssafy.lighthouse.domain.chat.entity.Chat;
import com.ssafy.lighthouse.domain.chat.entity.ChatRecord;
import com.ssafy.lighthouse.domain.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class MessageListener {

    private final ChatRepository chatRepository;


    @KafkaListener(
            topics = KafkaConstants.KAFKA_TOPIC,
            groupId = KafkaConstants.GROUP_STORE,
            containerFactory = "storeKafkaListenerContainerFactory"
    )
    public void listenAndStore(MessageDto messageDto) {

        if(!chatRepository.existsById(messageDto.getRoomId())) {
            chatRepository.save(ChatRecord.create(messageDto.getRoomId()));
        }

        ChatRecord record = chatRepository.findById(messageDto.getRoomId()).get();
        List<Chat> recordLog = record.getLog();
        recordLog.add(messageDto.convertMessageDtoToChat());
        record.setLog(recordLog);

        chatRepository.save(record);
        log.info("Storing consumer group working with : " + messageDto.toString());
    }




}
