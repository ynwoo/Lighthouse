package com.ssafy.lighthouse.domain.user.dto;

import com.ssafy.lighthouse.domain.common.dto.BadgeResponse;
import com.ssafy.lighthouse.domain.common.dto.TagDto;
import com.ssafy.lighthouse.domain.study.dto.SimpleStudyDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SimpleProfileResponse {
    private Long id;
    private int isValid;
    private String nickname;
    private String profileImgUrl;
    private String description;
    private List<TagDto> tags;
    private List<BadgeResponse> badges;
    private Double score;   // 유저 평점 평균
}
