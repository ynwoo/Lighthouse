package com.ssafy.lighthouse.domain.user.repository;

import com.ssafy.lighthouse.domain.user.dto.ProfileResponse;

public interface UserRepositoryCustom {
    ProfileResponse findProfileByUserId(Long userId);
}
