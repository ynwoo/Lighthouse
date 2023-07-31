package com.ssafy.lighthouse.domain.chat.service;

import com.ssafy.lighthouse.config.KafkaConstants;
import com.ssafy.lighthouse.domain.chat.dto.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class MessageListener {

    @Autowired
    SimpMessagingTemplate template;

    @KafkaListener(
            topics = KafkaConstants.KAFKA_TOPIC,
            groupId = KafkaConstants.GROUP_ID
    )
    public void listen(MessageDto messageDto) {
        log.info("msg dto in Listener!! " + messageDto.toString());
        log.info("sending via kafka listener..");
        template.convertAndSend("/topic/group", messageDto);
    }
}
