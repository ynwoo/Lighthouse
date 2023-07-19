package com.ssafy.lighthouse.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.user.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
