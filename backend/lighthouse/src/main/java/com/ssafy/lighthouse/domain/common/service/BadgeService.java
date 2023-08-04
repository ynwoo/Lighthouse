package com.ssafy.lighthouse.domain.common.service;

import com.ssafy.lighthouse.domain.common.dto.BadgeRequest;
import com.ssafy.lighthouse.domain.common.dto.BadgeResponse;
import org.springframework.web.multipart.MultipartFile;

public interface BadgeService {
    void createBadge(BadgeRequest badgeRequest, MultipartFile img);
    void removeBadge(Long badgeId, String imgUrl);
}
