package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Bookmark extends BaseEntity {
    private Long studyId;
    private Long userId;
}
