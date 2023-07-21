package com.ssafy.lighthouse.domain.study.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@RequiredArgsConstructor
public class Bookmark {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(insertable = false)
    private String createdAt;
    @Column(insertable = false)
    private int isValid;
    @NonNull
    private int studyId;
    @NonNull
    private int userId;

    public void remove() {
        this.isValid = 0;
    }
}
