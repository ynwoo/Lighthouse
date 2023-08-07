package com.ssafy.chatserver.chat.service;

import com.ssafy.chatserver.chat.dto.MessageDto;
import com.ssafy.chatserver.config.KafkaConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;


@Slf4j
@Component
@RequiredArgsConstructor
public class MessageListener {

    private final SimpMessagingTemplate template;

    @KafkaListener(
            topics = KafkaConstants.KAFKA_TOPIC,
            groupId = KafkaConstants.GROUP_PROPAGATE,
            containerFactory = "propKafkaListenerContainerFactory"
    )
    public void listenAndSend(MessageDto messageDto) {
        log.info("Propagation consumer working with : " + messageDto.toString());
        String roomId = messageDto.getRoomId();
        // propagation
        template.convertAndSend("/sub/"+roomId, messageDto);
    }


}
