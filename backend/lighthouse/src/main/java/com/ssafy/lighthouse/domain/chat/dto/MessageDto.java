package com.ssafy.lighthouse.domain.chat.dto;

import com.ssafy.lighthouse.domain.chat.entity.Chat;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@Data
@RequiredArgsConstructor
public class MessageDto implements Serializable {

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
