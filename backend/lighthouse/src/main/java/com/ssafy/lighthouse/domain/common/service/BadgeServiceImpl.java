package com.ssafy.lighthouse.domain.common.service;

import com.ssafy.lighthouse.domain.common.dto.BadgeRequest;
import com.ssafy.lighthouse.domain.common.dto.BadgeResponse;
import com.ssafy.lighthouse.domain.common.entity.Badge;
import com.ssafy.lighthouse.domain.common.repository.BadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class BadgeServiceImpl implements BadgeService {

    private final AmazonS3Service amazonS3Service;
    private final BadgeRepository badgeRepository;

    @Override
    public void createBadge(BadgeRequest badgeRequest) {
        // db에 badge정보 저장
        badgeRepository.save(Badge.builder()
                        .id(badgeRequest.getId())
                        .name(badgeRequest.getName())
                        .description(badgeRequest.getDescription())
                        .imgUrl(amazonS3Service.getFilePath(badgeRequest.getImg().getOriginalFilename()))
                .build());

        // aws에 업로드
        amazonS3Service.upload(badgeRequest.getImg());
    }
}
