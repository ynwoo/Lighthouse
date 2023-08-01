package com.ssafy.lighthouse.domain.chat.entity;

import com.ssafy.lighthouse.domain.chat.dto.MessageDto;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.BsonTimestamp;
import org.bson.types.ObjectId;

import javax.persistence.Id;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class Chat {
    @Id
    private ObjectId id;

    public enum MessageType {
        ENTER, TALK, LEAVE
    }

    private MessageDto.MessageType type;
    private String roomId;
    private String senderId;
    private String senderName;
    private String message;
    private Long time;
}
