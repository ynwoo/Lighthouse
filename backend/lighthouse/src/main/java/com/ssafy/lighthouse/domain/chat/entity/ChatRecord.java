package com.ssafy.lighthouse.domain.chat.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "chat")
@NoArgsConstructor
@Data
public class ChatRecord {
    @Id
    private String id;          // id of chatting room
    private String name;        // name of chatting room
    private List<Chat> log;     // actual chats

    public static ChatRecord create(String id) {
        ChatRecord record = new ChatRecord();
        record.setId(id);
        record.setName(null);
        record.setLog(new ArrayList<Chat>());
        return record;
    }
}
