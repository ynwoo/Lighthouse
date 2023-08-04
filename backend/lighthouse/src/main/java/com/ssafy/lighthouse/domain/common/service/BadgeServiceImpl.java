package com.ssafy.lighthouse.domain.common.service;

import com.ssafy.lighthouse.domain.common.dto.BadgeRequest;
import com.ssafy.lighthouse.domain.common.entity.Badge;
import com.ssafy.lighthouse.domain.common.repository.BadgeRepository;
import com.ssafy.lighthouse.domain.common.util.S3Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class BadgeServiceImpl implements BadgeService {

    private final S3Utils s3Utils;
    private final BadgeRepository badgeRepository;

    @Override
    public void createBadge(BadgeRequest badgeRequest, MultipartFile img) {
        // db에 badge정보 저장
        badgeRepository.save(Badge.builder()
                        .name(badgeRequest.getName())
                        .description(badgeRequest.getDescription())
                        .imgUrl(S3Utils.getFilePath(img.getOriginalFilename()))
                .build());

        // aws에 업로드
        s3Utils.uploadFile("badge", img);
    }
}
