package com.ssafy.lighthouse.domain.heartbeat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashMap;

@RequiredArgsConstructor
@Service
public class HeartbeatService {

    private final int repeatMilisecond = 1000 * 5;
    private final int offlineThreshMilisecond = 1000 * 10;
    private final HashMap<Long, Timestamp> userHeartbeat = new HashMap<Long, Timestamp>();

    public void updateHeartbeat(Long id) {
        userHeartbeat.put(id, new Timestamp(System.currentTimeMillis()));
    }

    @Scheduled(fixedRate = repeatMilisecond)
    public void checkOnlineTimer() {
        Timestamp now = new Timestamp(System.currentTimeMillis());

        // 현재 시간을 기준으로 repeatMilisecond 이상 heartbeat이 없는 유저를 오프라인으로 처리
        for (Long id : userHeartbeat.keySet()) {
            Timestamp lastHeartbeat = userHeartbeat.get(id);
            if (now.getTime() - lastHeartbeat.getTime() > offlineThreshMilisecond) {
                // 오프라인 처리됨
                System.out.println("오프라인 처리됨: " + id);
                userHeartbeat.remove(id);
            }
        }
    }
}
