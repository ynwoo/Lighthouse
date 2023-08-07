package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.study.entity.Qna;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class QnaDto {
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class Req {
		private Long id;
		private int isValid;
		private Long userId;
		private Long studyId;
		private String question;
		private String answer;

		@Builder
		public Req(Long userId, Long studyId, String question, String answer) {
			this.userId = userId;
			this.studyId = studyId;
			this.question = question;
			this.answer = answer;
		}

		public Qna toEntity() {
			return Qna.builder()
					.id(id)
					.isValid(isValid)
				.userId(userId)
				.studyId(studyId)
				.question(question)
				.answer(answer)
				.build();
		}
	}
	@Getter
	@NoArgsConstructor(access = AccessLevel.PROTECTED)
	public static class Res {
		private Long id;
		private int isValid;
		private String createdAt;
		private Long userId;
		private Long studyId;
		private String question;
		private String answer;

		public Res(Qna qna) {
			this.id = qna.getId();
			this.isValid = qna.getIsValid();
			this.createdAt = qna.getCreatedAt();
			this.userId = qna.getUserId();
			this.studyId = qna.getStudyId();
			this.question = qna.getQuestion();
			this.answer = qna.getAnswer();
		}
	}
}
