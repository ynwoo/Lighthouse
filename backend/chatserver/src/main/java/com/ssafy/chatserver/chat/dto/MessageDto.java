package com.ssafy.chatserver.chat.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class MessageDto {

    public enum MessageType {
        ENTER, TALK, LEAVE
    }

    private MessageType type;
    private String roomId;
    private String senderId;
    private String senderName;
    private String message;
    private Long time;
}
