package com.ssafy.lighthouse.domain.common.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Entity
@Getter
@NoArgsConstructor
public class Tag extends BaseEntity {
    private String keyword;
}
