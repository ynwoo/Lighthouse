package com.ssafy.lighthouse.domain.chat.controller;

import com.ssafy.lighthouse.domain.chat.entity.ChatRoom;
import com.ssafy.lighthouse.domain.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@Slf4j
@RequiredArgsConstructor
// 채팅방 조회, 생성, 입장 관리
public class ChatRoomController {

    private final ChatRepository repository;

    // 채팅 리스트 확인
    // 전체 리스트 담아서 return
    @GetMapping("/chat/roomlist")
    public String ChatRoomList(Model model) {
        model.addAttribute("list", repository.findAllRoom());
        log.debug("show all chat room list : {}", repository.findAllRoom());

        return "roomList";
    }

    // 채팅방 생성
    @PostMapping("/chat/createroom")
    public String createRoom(@RequestParam String roomName, RedirectAttributes rttr) {
        ChatRoom chatRoom = repository.createChatRoom(roomName);
        log.debug("create chat room : {}", chatRoom);

        rttr.addFlashAttribute("roomName", chatRoom);
        return "redirect:/";
    }

    // 채팅방 입장 화면
    // 파라미터로 넘어오는 roomId 확인
    // 해당 채팅방을 찾아서 클라이언트를 chat room으로 보낸ㅁ
    @GetMapping("/chat/joinroom")
    public String joinRoom(String roomId, Model model) {
        log.debug("join chat room : {}", roomId);
        model.addAttribute("room", repository.findByRoomId(roomId));

        return "chatroom";
    }

}
