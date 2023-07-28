package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.*;

import javax.persistence.Entity;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class StudyLike extends BaseEntity {
    private Long studyId;
    private Long userId;
}
