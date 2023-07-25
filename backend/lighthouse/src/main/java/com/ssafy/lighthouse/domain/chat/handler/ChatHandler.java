package com.ssafy.lighthouse.domain.chat.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.lighthouse.domain.chat.dto.ChatDto;
import com.ssafy.lighthouse.domain.chat.entity.ChatRoom;
import com.ssafy.lighthouse.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@Slf4j
@RequiredArgsConstructor
public class ChatHandler extends TextWebSocketHandler {

    private final ObjectMapper mapper;
    private final ChatService service;

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        String payload = (String) message.getPayload();
        log.debug("payload : {}", payload);

        ChatDto chatMessage = mapper.readValue(payload, ChatDto.class);
        log.debug("session : {}", chatMessage.toString());

        ChatRoom room = service.findRoomById(chatMessage.getRoomId());
        log.debug("room : {}", room.toString());

        room.handleAction(session, chatMessage, service);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.debug("client connection established : {}", session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.debug("client connection closed : {}", session);
    }

}
