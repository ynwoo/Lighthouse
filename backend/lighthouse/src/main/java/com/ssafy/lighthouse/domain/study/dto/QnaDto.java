package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.study.entity.Qna;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class QnaDto {
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class QnaReq {
		private long userId;
		private long studyId;
		private String question;
		private String answer;

		@Builder
		public QnaReq(long userId, long studyId, String question, String answer) {
			this.userId = userId;
			this.studyId = studyId;
			this.question = question;
			this.answer = answer;
		}

		public Qna toEntity() {
			return Qna.builder()
				.userId(userId)
				.studyId(studyId)
				.question(question)
				.answer(answer)
				.build();
		}
	}
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class QnaRes {
		private long id;
		private String createdAt;
		private long userId;
		private long studyId;
		private String question;
		private String answer;

		public QnaRes(Qna qna) {
			this.id = qna.getId();
			this.createdAt = qna.getCreatedAt();
			this.userId = qna.getUserId();
			this.studyId = qna.getStudyId();
			this.question = qna.getQuestion();
			this.answer = qna.getAnswer();
		}

		public Qna toEntity() {
			return Qna.builder()
				.userId(userId)
				.studyId(studyId)
				.question(question)
				.answer(answer)
				.build();
		}
	}
}
