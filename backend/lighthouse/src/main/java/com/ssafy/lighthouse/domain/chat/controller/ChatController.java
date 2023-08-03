package com.ssafy.lighthouse.domain.chat.controller;
import com.ssafy.lighthouse.config.KafkaConstants;
import com.ssafy.lighthouse.domain.chat.dto.MessageDto;
import com.ssafy.lighthouse.domain.chat.service.ChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;

import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;


@RestController
@Slf4j
@CrossOrigin
@RequestMapping(value = "/kafka")
public class ChatController {
    @Autowired
    private KafkaTemplate<String, MessageDto> kafkaTemplate;

    @Autowired
    private ChatService chatService;

    // publish message to the broker
    @PostMapping(value = "/publish")
    public void sendMessage(@RequestBody MessageDto messageDto) {
        log.info("Produce message : " + messageDto.toString());
        messageDto.setTime(System.currentTimeMillis());
        try {
            kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, "send_temp_key", messageDto).get();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // get all message of the given chatting room
    @GetMapping
    public ResponseEntity<?> getAllMessage(@RequestParam String id) {
        log.info("Get all message of room : " + id);
        /*
        logical session management, connection here -> replaced with KAFKA
        CODE HERE
         */
        return new ResponseEntity<>(chatService.getAllMessage(id), HttpStatus.OK);
    }

}
