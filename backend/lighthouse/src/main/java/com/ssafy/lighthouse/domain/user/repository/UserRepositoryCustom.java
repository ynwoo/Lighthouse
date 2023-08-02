package com.ssafy.lighthouse.domain.user.repository;

import com.ssafy.lighthouse.domain.user.dto.ProfileResponse;
import com.ssafy.lighthouse.domain.user.dto.SimpleProfileResponse;

public interface UserRepositoryCustom {
    ProfileResponse findProfileByUserId(Long userId, Long loginId);
    SimpleProfileResponse findSimpleProfileByUserId(Long userId);
}
