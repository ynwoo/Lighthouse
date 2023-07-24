package com.ssafy.lighthouse.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.user.entity.User;

public interface UserTagRepository extends JpaRepository<User, Integer> {
	List<User> findByIsValid(int isValid);
}
