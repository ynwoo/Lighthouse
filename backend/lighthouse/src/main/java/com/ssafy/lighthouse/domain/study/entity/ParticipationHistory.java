package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
        this.status = status;
    }
    public void initJoinedAt() {
        this.joinedAt = formatLocalDateTimeToString(LocalDateTime.now());
    }

    public void initLeavedAt() {
        this.leavedAt = formatLocalDateTimeToString(LocalDateTime.now());
    }

    private String formatLocalDateTimeToString(LocalDateTime localDateTime) {
        return localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
