package com.ssafy.lighthouse.domain.chat.entity;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
public class ChatRoom {
    private String roomId;
    private String name;

    @Builder
    public ChatRoom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }
}
