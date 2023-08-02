package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.global.util.LocalDateTime;
import com.ssafy.lighthouse.global.util.STATUS;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ParticipationHistory extends BaseEntity {
    private Long userId;
    private Long studyId;
    private int userRole;
    private String joinedAt;
    private String leavedAt;
    private int status;

    public void changeStatus(int status) {
        if(status == STATUS.PROGRESS) {
            this.initJoinedAt();
        } else if(status == STATUS.LEAVED) {
            this.initLeavedAt();
        } else if(status == STATUS.TERMINATED) {
        } else {
            return;
        }

        this.status = status;
    }
    public void initJoinedAt() {
        this.joinedAt = LocalDateTime.now();
    }

    public void initLeavedAt() {
        this.leavedAt = LocalDateTime.now();
    }
}
