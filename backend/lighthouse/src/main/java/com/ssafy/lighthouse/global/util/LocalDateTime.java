package com.ssafy.lighthouse.global.util;

import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;

@Component
public class LocalDateTime {
    public static String now() {
        return java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
