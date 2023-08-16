package com.ssafy.lighthouse.domain.common.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class BadgeRequest {
    private Long id;
    private String name;
    private String description;
    private MultipartFile img;
}
