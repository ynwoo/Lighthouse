package com.ssafy.lighthouse.domain.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.user.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
	List<User> findByIsValid(int isValid);

//	@Query("SELECT u FROM User u LEFT JOIN FETCH u.userTags ut LEFT JOIN FETCH ut.tag WHERE u.id = :userId")
//	User findUserWithTags(@Param("userId") Long userId);
	User findByEmail(String userEmail);

	// @Query("SELECT u FROM User u LEFT JOIN FETCH u.userTags ut LEFT JOIN FETCH ut.tag WHERE u.id = :userId")
	// User findUserWithTags(@Param("userId") Long userId);
}
