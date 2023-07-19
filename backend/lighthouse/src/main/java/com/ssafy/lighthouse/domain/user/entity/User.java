package com.ssafy.lighthouse.domain.user.entity;

import javax.persistence.*;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "name", "nickname"})
public class User {
	@Id
	@GeneratedValue
	private Integer id;
	private String password;
	private String name;
	private String email;
	private String nickname;

	private String profileImgUrl;
	private int age;
	private String address;
	private String phoneNumber;
	private String description;
}
