package com.ssafy.lighthouse.domain.user.dto;

import com.ssafy.lighthouse.domain.user.entity.UserEval;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserEvalDto {
    private Long id;
    private int isValid;
    private String createdAt;
    private Long userId;
    private Long evaluatorId;
    private String tag;
    private int score;

    public void setEvaluatorId(Long evaluatorId) {
        this.evaluatorId = evaluatorId;
    }

    public UserEval toEntity() {
        return UserEval.builder()
                .id(this.id)
                .isValid(this.isValid)
                .createdAt(this.createdAt)
                .userId(this.userId)
                .evaluatorId(this.evaluatorId)
                .tag(this.tag)
                .score(this.score)
                .build();
    }
}
