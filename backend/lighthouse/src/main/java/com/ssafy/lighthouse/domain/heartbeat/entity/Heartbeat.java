package com.ssafy.lighthouse.domain.heartbeat.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection = "heartbeat")
@Getter
@Setter
@NoArgsConstructor
public class Heartbeat {
    @Id
    private Long id;
    private Long activeAt;

    public Heartbeat(Long id) {
        this.id = id;
        this.activeAt = System.currentTimeMillis();
    }
}
