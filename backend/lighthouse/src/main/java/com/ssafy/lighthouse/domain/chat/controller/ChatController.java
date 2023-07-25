package com.ssafy.lighthouse.domain.chat.controller;

import com.ssafy.lighthouse.domain.chat.dto.ChatDto;
import com.ssafy.lighthouse.domain.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;

@Controller
@Slf4j
@RequiredArgsConstructor
// 채팅 송신(Pub) 및 수신(Sub) 관리
public class ChatController {

    // for use of convertAndSend -> automatically convert to Message object and send
    private final SimpMessageSendingOperations template;
    private final ChatRepository repository;

    // MessageMapping -> send msg via websocket
    // client side: /pub/chat/message -> controller
    // process ...
    // server side: /sub/chat/room/{roomId} -> client
    @MessageMapping("/chat/enterUser")
    public void enterUser(@Payload ChatDto chat, SimpMessageHeaderAccessor headerAccessor) {

        // user count += 1
        repository.increaseUser(chat.getRoomId());

        // add user to the room, return UUID
        String userUUID = repository.addUser(chat.getRoomId(), chat.getSender());

        // add userUUID to websocket session
        headerAccessor.getSessionAttributes().put("userUUID", userUUID);
        headerAccessor.getSessionAttributes().put("roomId", chat.getRoomId());

        // send msg to all users in the room
        chat.setMessage(chat.getSender() + "님이 입장하셨습니다.");
        template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);
    }

    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@Payload ChatDto chat) {
        log.debug("send message : {}", chat);
        chat.setMessage(chat.getSender() + " : " + chat.getMessage());
        template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);
    }

    @EventListener
    public void webSocketDisconnectListener(SessionDisconnectEvent event) {
        log.debug("web socket disconnect listener : {}", event);

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // uuid, roomid from stomp session -> temove user from the room
        String userUUID = (String) headerAccessor.getSessionAttributes().get("userUUID");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");

        log.debug("headerAccessor : {}", headerAccessor);

        // decrease user count
        repository.decreaseUser(roomId);

        // remove user from the chatting room
        String userName = repository.getUserName(roomId, userUUID);
        repository.deleteUser(roomId, userUUID);

        if (userName != null) {
            log.debug("user {} is disconnected from room {}", userName, roomId);

            ChatDto chat = ChatDto.builder()
                    .type(ChatDto.MessageType.LEAVE)
                    .sender(userName)
                    .message(userName + "님이 퇴장하셨습니다.")
                    .build();

            template.convertAndSend("/sub/chat/room/" + roomId, chat);
        }

    }

    // return users in the room
    @GetMapping("/chat/userlist")
    @ResponseBody
    public List<String> userList(String roomId) {
        return repository.getUserList(roomId);
    }

    // check user name duplicate
    @GetMapping("/chat/duplicateName")
    @ResponseBody
    public String isDuplicateName(@RequestParam("roomId") String roomId, @RequestParam("username") String username) {
        String userName = repository.isDuplicateName(roomId, username);
        log.debug("isDuplicateName : {}", userName);

        return userName;
    }

}
