package com.ssafy.lighthouse.domain.common.dto;

import com.ssafy.lighthouse.domain.common.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class TagDto {
    private Long id;
    private String keyword;

    public TagDto(Tag tag) {
        this.id = tag.getId();
        this.keyword = tag.getKeyword();
    }

    public Tag toEntity() {
        return Tag.builder()
                .id(this.id)
                .keyword(this.keyword)
                .build();
    }
}
