package com.ssafy.lighthouse.domain.common.service;

import com.ssafy.lighthouse.domain.common.dto.BadgeRequest;
import com.ssafy.lighthouse.domain.common.dto.BadgeResponse;

public interface BadgeService {
    void createBadge(BadgeRequest badgeRequest);
}
