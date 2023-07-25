package com.ssafy.lighthouse.domain.chat.controller;

import com.ssafy.lighthouse.domain.chat.entity.ChatRoom;
import com.ssafy.lighthouse.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {

    private final ChatService service;

    @PostMapping
    public ChatRoom createRoom(@RequestParam String name, @RequestParam String id) {
        log.debug("post name : {}, id : {}", name, id);
        return service.createRoom(name, id);
    }

    @GetMapping
    public List<ChatRoom> findAllRooms() {
        return service.findAllRoom();
    }
}
