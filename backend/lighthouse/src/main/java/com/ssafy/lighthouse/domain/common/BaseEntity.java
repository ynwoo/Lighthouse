package com.ssafy.lighthouse.domain.common;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@MappedSuperclass
public abstract class BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(insertable = false, updatable = false)
	private String createdAt;
	@Column(insertable = false)
	private int isValid;

	public void remove() {
		this.isValid = 0;
	}
	public boolean isValid() {return isValid == 1;}
	public void changeIsValid(int isValid) {this.isValid = isValid;}
}
