package com.ssafy.lighthouse.domain.study.entity;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "study")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@RequiredArgsConstructor
public class Study {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
//    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private String createdAt;
    private boolean isValid;
}
