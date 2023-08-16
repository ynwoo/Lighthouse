package com.ssafy.lighthouse.domain.common.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class BadgeRequest {
    private Long id;
    private int isValid;
    private String name;
    private String description;
    private MultipartFile img;
}
