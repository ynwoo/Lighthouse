package com.ssafy.lighthouse.domain.user.repository;

import com.ssafy.lighthouse.domain.user.dto.ProfileResponse;
import com.ssafy.lighthouse.domain.user.dto.SimpleProfileResponse;
import com.ssafy.lighthouse.domain.user.dto.SimpleUserResponse;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepositoryCustom {
    ProfileResponse findProfileByUserId(Long userId, Long loginId);
    SimpleProfileResponse findSimpleProfileByUserId(Long userId);
    List<SimpleProfileResponse> findSimpleProfileByUserIds(List<Long> userIds);
    SimpleUserResponse findUserInfo(@Param("userId") Long userId);
}
