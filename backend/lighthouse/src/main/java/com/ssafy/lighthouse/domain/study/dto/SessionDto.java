package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.study.entity.Session;
import com.ssafy.lighthouse.domain.study.entity.SessionCheck;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class SessionDto {
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class SessionReq {
		private String startedAt;
		private String endedAt;
		private Long studyId;
		private String title;
		private String description;
		private String comment;
		private int status;
		private int seqNum;

		@Builder
		public SessionReq(String startedAt, String endedAt, Long studyId, String title, String description,
			String comment, int status, int seqNum) {
			this.startedAt = startedAt;
			this.endedAt = endedAt;
			this.studyId = studyId;
			this.title = title;
			this.description = description;
			this.comment = comment;
			this.status = status;
			this.seqNum = seqNum;
		}

		public Session toEntity() {
			return Session.builder()
				.startedAt(startedAt)
				.endedAt(endedAt)
				.studyId(studyId)
				.title(title)
				.description(description)
				.comment(comment)
				.status(status)
				.seqNum(seqNum)
				.build();
		}
	}

	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class SessionCheckReq {
		private Long userId;
		private Long sessionId;
		private String content;

		@Builder
		public SessionCheckReq(Long userId, Long sessionId, String content) {
			this.userId = userId;
			this.sessionId = sessionId;
			this.content = content;
		}

		public SessionCheck toEntity() {
			return SessionCheck.builder()
				.userId(userId)
				.sessionId(sessionId)
				.content(content)
				.build();
		}
	}
}
