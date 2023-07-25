package com.ssafy.lighthouse.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.user.entity.User;
import com.ssafy.lighthouse.domain.user.entity.UserTag;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserTagRepository extends JpaRepository<UserTag, Long> {
	List<User> findByIsValid(int isValid);

	// @Query("SELECT DISTINCT ut.tagId FROM UserTag ut " +
	// 		"JOIN ut.tagId t " +
	// 		"WHERE ut.userId = :userId AND ut.isValid = 1")
	// List<String> findDistinctTagByUserIdAndIsValidTrue(@Param("userId") Long userId);
}
