package com.ssafy.lighthouse.domain.chat.controller;
import com.ssafy.lighthouse.config.KafkaConstants;
import com.ssafy.lighthouse.domain.chat.dto.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@Slf4j
@CrossOrigin
@RequestMapping(value = "/kafka")
public class ChatController {
    @Autowired
    private KafkaTemplate<String, MessageDto> kafkaTemplate;

    @PostMapping(value = "/publish")
    public void sendMessage(@RequestBody MessageDto messageDto) {
        log.info("Produce message : " + messageDto.toString());
        messageDto.setTime(LocalDateTime.now().toString());
        try {
            kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, messageDto).get();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/group")
    public MessageDto broadcastGroupMessage(@Payload MessageDto messageDto) {
        return messageDto;
    }

}
