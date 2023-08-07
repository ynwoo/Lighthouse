package com.ssafy.lighthouse.domain.user.repository;

import com.ssafy.lighthouse.domain.user.dto.ProfileResponse;
import com.ssafy.lighthouse.domain.user.dto.SimpleProfileResponse;

import java.util.List;
import java.util.Set;

public interface UserRepositoryCustom {
    ProfileResponse findProfileByUserId(Long userId, Long loginId);
    SimpleProfileResponse findSimpleProfileByUserId(Long userId);
    List<SimpleProfileResponse> findSimpleProfileByUserIds(List<Long> userIds);
}
