package com.ssafy.lighthouse.domain.common.dto;

import com.ssafy.lighthouse.domain.common.entity.Badge;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BadgeDto {
    private Long id;
    private String imgUrl;
    private String name;
    private String description;

    public BadgeDto(Badge badge) {
        this.id = badge.getId();
        this.imgUrl = badge.getImgUrl();
        this.name = badge.getName();
        this.description = badge.getDescription();
    }

//    public Badge toEntity() {
//        return Badge.builder()
//                .id(this.id)
//                .imgUrl(this.imgUrl)
//                .name(this.name)
//                .description(this.description)
//                .build();
//    }
}
