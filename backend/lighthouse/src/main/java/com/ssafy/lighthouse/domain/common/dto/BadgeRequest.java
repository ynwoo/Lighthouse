package com.ssafy.lighthouse.domain.common.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
public class BadgeRequest {
    private Long id;
    private MultipartFile img;
    private String name;
    private String description;
}
