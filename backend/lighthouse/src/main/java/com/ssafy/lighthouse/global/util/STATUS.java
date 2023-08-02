package com.ssafy.lighthouse.global.util;

import org.springframework.stereotype.Component;

@Component
public class STATUS {
    public static final int PREPARING = 0;
    public static final int PROGRESS = 1;
    //완료
    public static final int TERMINATED = 2;
    // 중간 탈퇴
    public static final int LEAVED = 3;
    public static final int SHARE = 4;
}
