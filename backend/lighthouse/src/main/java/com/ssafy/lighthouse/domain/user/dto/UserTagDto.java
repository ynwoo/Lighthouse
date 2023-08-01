package com.ssafy.lighthouse.domain.user.dto;

import com.ssafy.lighthouse.domain.common.dto.TagDto;
import com.ssafy.lighthouse.domain.user.entity.UserTag;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserTagDto {
    private Long id;
    private int isValid;
    private Long userId;
    private TagDto tag;

    public UserTagDto(UserTag userTag) {
        this.id = userTag.getId();
        this.isValid = userTag.getIsValid();
        this.userId = userTag.getUserId();
        this.tag = new TagDto(userTag.getTag());
    }

    public UserTag toEntity() {
        return UserTag.builder()
                .id(this.id)
                .isValid(this.isValid)
                .userId(this.userId)
                .tag(this.tag.toEntity())
                .build();
    }
}
