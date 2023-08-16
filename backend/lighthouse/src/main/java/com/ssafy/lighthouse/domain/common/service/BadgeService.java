package com.ssafy.lighthouse.domain.common.service;

import com.ssafy.lighthouse.domain.common.dto.BadgeRequest;
import com.ssafy.lighthouse.domain.common.dto.BadgeResponse;
import com.ssafy.lighthouse.domain.common.entity.Badge;
import org.springframework.web.multipart.MultipartFile;

public interface BadgeService {
    Badge createBadge(BadgeRequest badgeRequest);
    void removeBadge(Long badgeId);
}
