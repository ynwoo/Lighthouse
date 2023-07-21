package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.study.entity.StudyNotice;
import com.ssafy.lighthouse.domain.study.entity.StudyNoticeCheck;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class StudyNoticeDto {
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class StudyNoticeReq {
		private int studyId;
		private String content;

		@Builder
		public StudyNoticeReq(int studyId, String content) {
			this.studyId = studyId;
			this.content = content;
		}

		public StudyNotice toEntity() {
			return StudyNotice.builder()
				.studyId(studyId)
				.content(content)
				.build();
		}
	}

	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class StudyNoticeCheckReq {
		private int userId;
		private int studyNoticeId;

		@Builder
		public StudyNoticeCheckReq(int userId, int studyNoticeId) {
			this.userId = userId;
			this.studyNoticeId = studyNoticeId;
		}

		public StudyNoticeCheck toEntity() {
			return StudyNoticeCheck.builder()
				.userId(userId)
				.studyNoticeId(studyNoticeId)
				.build();
		}
	}
}
