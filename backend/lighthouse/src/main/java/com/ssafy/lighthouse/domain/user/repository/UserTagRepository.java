package com.ssafy.lighthouse.domain.user.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.lighthouse.domain.user.entity.UserTag;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserTagRepository extends JpaRepository<UserTag, Long> {
	List<UserTag> findByIsValid(Integer isValid);

	@Transactional
	@Modifying
	@Query("UPDATE UserTag ut SET ut.isValid = 0 WHERE ut.userId = :userId")
	void updateIsValidToZeroByUserId(@Param("userId") Long userId);

	List<UserTag> findByUserIdAndIsValid(Long userId, Integer isValid);

	@Query("select ut.tag.id from UserTag ut WHERE ut.userId = :userId and ut.isValid = 1")
	Set<Long> findTagIdAllByUserId(@Param("userId") Long userId);
}
