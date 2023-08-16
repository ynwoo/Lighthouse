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
public class ProfileResponse {
    private Long id;
    private int isValid;
    private String nickname;
    private String profileImgUrl;
    private String description;
    private List<TagDto> tags;
    private List<SimpleStudyDto> participatedStudies;    // 신청한 스터디 (본인 프로필에서만 조회 가능)
    private List<SimpleStudyDto> recruitingStudies;    // 모집중 스터디
    private List<SimpleStudyDto> progressStudies;    // 진행 중 스터디
    private List<SimpleStudyDto> terminatedStudies;   // 완료 된 스터디
    private List<SimpleStudyDto> bookmarkStudies;
    private List<BadgeResponse> badges;
    private Double score;   // 유저 평점 평균
    private Long following;
    private Long follower;
    private SimpleUserResponse simpleUserResponse;
    private List<SimpleProfileResponse> participatedUserProfiles;
}
