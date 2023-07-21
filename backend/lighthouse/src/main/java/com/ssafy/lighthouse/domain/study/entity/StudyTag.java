package com.ssafy.lighthouse.domain.study.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@RequiredArgsConstructor
public class StudyTag {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(insertable = false)
    private String createdAt;
    @Column(insertable = false)
    private int isValid;
    @NonNull
    private int studyId;
    @NonNull
    private int tagId;

    public void remove() {
        this.isValid = 0;
    }
}
