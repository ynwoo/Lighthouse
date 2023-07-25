package com.ssafy.lighthouse.domain.common.entity;

import javax.persistence.Entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Gugun extends BaseEntity {
	private Long sidoId;
	private String name;
}
