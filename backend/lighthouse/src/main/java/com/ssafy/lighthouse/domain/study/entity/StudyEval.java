package com.ssafy.lighthouse.domain.study.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "studyeval")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@RequiredArgsConstructor
public class StudyEval {
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
    @NonNull
    private String comment;
    @NonNull
    private int score;

    public void changeIsValidFalse() {
        this.isValid = 0;
    }
}
