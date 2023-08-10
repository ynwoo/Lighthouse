package com.ssafy.lighthouse.domain.user.dto;

import com.ssafy.lighthouse.domain.study.dto.SimpleStudyDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import java.util.List;

@NoArgsConstructor
@Getter
@Builder
@AllArgsConstructor
public class SimpleUserResponse {
	Long id;
	String nickname;
	List<Long> progressStudies;
	List<Long> follows;
	List<Long> bookmarks;
	List<Long> likes;
}
