package com.ssafy.lighthouse.domain.study.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "like")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@RequiredArgsConstructor
public class Like {
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

    public void changeIsValidFalse() {
        this.isValid = 0;
    }
}
