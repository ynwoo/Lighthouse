package com.ssafy.lighthouse.domain.chat.controller;
import com.ssafy.lighthouse.config.KafkaConstants;
import com.ssafy.lighthouse.domain.chat.dto.MessageDto;
import com.ssafy.lighthouse.domain.chat.service.ChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;

import org.springframework.kafka.support.SendResult;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.concurrent.CompletableFuture;


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
            ListenableFuture<SendResult<String, MessageDto>> future = kafkaTemplate.send(KafkaConstants.KAFKA_TOPIC, messageDto.getRoomId(), messageDto);
            future.addCallback(new ListenableFutureCallback<SendResult<String, MessageDto>>() {
                @Override
                public void onFailure(Throwable ex) {
                    log.debug("UNABLE TO SEND MSG=[" + messageDto.toString() + "] due to : " + ex.getMessage());
                }

                @Override
                public void onSuccess(SendResult<String, MessageDto> result) {
                    log.debug("SENT MSG!!! ["+ messageDto.toString()+"with RESULT : "+result.toString());
                }
            });
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // get all message of the given chatting room
    @GetMapping("/{id}")
    public ResponseEntity<?> getAllMessage(@PathVariable String id) {
        log.info("Get all message of room : " + id);
        /*
        logical session management, connection here -> replaced with KAFKA
        CODE HERE
         */
        return new ResponseEntity<>(chatService.getAllMessage(id), HttpStatus.OK);
    }

}
