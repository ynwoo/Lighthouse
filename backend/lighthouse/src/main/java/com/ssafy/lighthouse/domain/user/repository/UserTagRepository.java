package com.ssafy.lighthouse.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.user.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserTagRepository extends JpaRepository<User, Integer> {
	List<User> findByIsValid(int isValid);

	@Query("SELECT DISTINCT t.keyword FROM UserTag ut " +
			"JOIN ut.tag t " +
			"WHERE ut.user.id = :userId AND ut.isValid = 1")
	List<String> findDistinctTagByUserIdAndIsValidTrue(@Param("userId") Integer userId);
}
