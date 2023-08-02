package com.ssafy.lighthouse.global.util;

import org.springframework.stereotype.Component;

@Component
public class STATUS {
    public static final int PREPARING = 0;  // 참가 신청,
    public static final int RECRUITING = 1;  // 모집중
    public static final int PROGRESS = 2;   // 시작
    //완료
    public static final int TERMINATED = 3; // 종료
    // 중간 탈퇴
    public static final int LEAVED = 4;     // 중단
    public static final int SHARE = 5;      // 공유
}
