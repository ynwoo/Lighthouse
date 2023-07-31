package com.ssafy.lighthouse.domain.user.dto;

import com.ssafy.lighthouse.domain.common.dto.TagDto;
import com.ssafy.lighthouse.domain.common.entity.Tag;
import com.ssafy.lighthouse.domain.study.dto.SimpleStudyDto;
import com.ssafy.lighthouse.domain.study.entity.Study;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponse {
    private String nickname;
    private String profileImgUrl;
    private String description;
    private List<TagDto> tags;
    private List<SimpleStudyDto> studies;    // 진행 중 스터디
    private List<SimpleStudyDto> participatedStudies;   // 참여했던 스터디
    private List<SimpleStudyDto> bookmarkStudies;
    //    private List<BadgeDto> badges;
    private Double score;   // 유저 평점 평균
    private Long following;
    private Long follower;

//    public ProfileResponse(String nickname, String profileImgUrl, String description, List<Tag> tags, List<Study> studies, List<Study> participatedStudies, List<Study> bookmarkStudies, Double score, Long following, Long follower) {
//        this.nickname = nickname;
//        this.profileImgUrl = profileImgUrl;
//        this.description = description;
//        this.tags = tags != null ? tags.stream().map(TagDto::new).collect(Collectors.toList()) : null;
//        this.studies = studies != null ? studies.stream().map(SimpleStudyDto::new).collect(Collectors.toList()) : null;
//        this.participatedStudies = participatedStudies != null ? participatedStudies.stream().map(SimpleStudyDto::new).collect(Collectors.toList()) : null;
//        this.bookmarkStudies = bookmarkStudies != null ? bookmarkStudies.stream().map(SimpleStudyDto::new).collect(Collectors.toList()) : null;
//        this.score = score;
//        this.following = following;
//        this.follower = follower;
//    }
}
