package com.ssafy.lighthouse.domain.user.entity;

import javax.persistence.Entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlertQueue extends BaseEntity {
	private Long producerId;
	private Long consumerId;
	private String message;
	private Integer type;
}
