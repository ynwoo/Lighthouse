package com.ssafy.lighthouse.domain.common.dto;

import com.ssafy.lighthouse.domain.common.entity.Badge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BadgeResponse {
    private Long id;
    private String imgUrl;
    private String name;
    private String description;

    public BadgeResponse(Badge badge) {
        this.id = badge.getId();
        this.imgUrl = badge.getImgUrl();
        this.name = badge.getName();
        this.description = badge.getDescription();
    }
}
