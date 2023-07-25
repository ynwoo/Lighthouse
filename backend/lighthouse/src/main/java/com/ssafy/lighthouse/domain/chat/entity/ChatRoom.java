package com.ssafy.lighthouse.domain.chat.entity;

import com.ssafy.lighthouse.domain.chat.dto.ChatDto;
import com.ssafy.lighthouse.domain.chat.service.ChatService;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Data
public class ChatRoom {
    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    public void handleAction(WebSocketSession session, ChatDto message, ChatService service) {
        if (message.getType().equals(ChatDto.MessageType.ENTER)) {
            sessions.add(session);
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
            sendMessage(message, service);

        } else if (message.getType().equals(ChatDto.MessageType.LEAVE)) {
            sessions.remove(session);
            message.setMessage(message.getSender() + "님이 퇴장하셨습니다.");
            sendMessage(message, service);

        } else {
            message.setMessage(message.getSender() + " : " + message.getMessage());
            sendMessage(message, service);
        }
    }

    public <T> void sendMessage(T message, ChatService service) {
        sessions.parallelStream().forEach(sessions -> service.sendMessage(sessions, message));
    }
}
