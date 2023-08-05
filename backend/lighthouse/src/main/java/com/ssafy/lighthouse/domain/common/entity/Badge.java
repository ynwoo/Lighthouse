package com.ssafy.lighthouse.domain.common.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class Badge extends BaseEntity {
    private String imgUrl;
    private String name;
    private String description;
}
