package com.ssafy.lighthouse.domain.user.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEval extends BaseEntity {
    private Long userId;
    private Long evaluatorId;
    private String tag;
    private int score;
}
