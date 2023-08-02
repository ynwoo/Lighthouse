package com.ssafy.lighthouse.domain.common.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
public class Tag extends BaseEntity {
    private String keyword;
}
