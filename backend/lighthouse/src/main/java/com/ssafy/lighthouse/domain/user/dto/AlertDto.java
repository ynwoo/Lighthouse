package com.ssafy.lighthouse.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class AlertDto {
	private Long id;
	private String createdAt;

	private Long producerId;
	private Long consumerId;
	private String message;
	private Integer type;

	@Builder
	public AlertDto(Long id, String createdAt, Long producerId, Long consumerId, String message, Integer type) {
		this.id = id;
		this.createdAt = createdAt;
		this.producerId = producerId;
		this.consumerId = consumerId;
		this.message = message;
		this.type = type;
	}
}
