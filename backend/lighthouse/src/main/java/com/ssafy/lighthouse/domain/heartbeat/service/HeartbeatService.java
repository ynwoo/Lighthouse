package com.ssafy.lighthouse.domain.heartbeat.service;

import com.ssafy.lighthouse.domain.heartbeat.entity.Heartbeat;
import com.ssafy.lighthouse.domain.heartbeat.repository.HeartbeatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashMap;

@RequiredArgsConstructor
@Service
@Slf4j
public class HeartbeatService {

    private final HeartbeatRepository heartbeatRepository;

    private final int repeatMilisecond = 1000 * 20;
    private HashMap<Long, Heartbeat> checkPending = new HashMap<Long, Heartbeat>();
    private HashMap<Long, Heartbeat> aliveChecked = new HashMap<Long, Heartbeat>();


    public void updateHeartbeat(Long id) {
        Heartbeat beat;

        // case 1: user alive: pending -> active
        if (checkPending.containsKey(id)) {
            beat = checkPending.get(id);
            checkPending.remove(id);

            beat.setActiveAt(System.currentTimeMillis());
            aliveChecked.put(id, beat);
        // case 2: user already alive: active -> active
        } else if (aliveChecked.containsKey(id)) {
            beat = aliveChecked.get(id);
            beat.setActiveAt(System.currentTimeMillis());
        // case 3: new user: new -> active
        } else {
            beat = new Heartbeat(id);
            aliveChecked.put(id, beat);
            heartbeatRepository.save(beat);
        }

    }

    @Scheduled(fixedRate = repeatMilisecond)
    public void checkOnlineTimer() {
        // to be offline: pending timeout
        for (Long id: checkPending.keySet()) {
            // send offline signal to client via web socket
            /*
            CODE HERE
             */
            log.debug("오프라인 처리됨: " + id);
        }

        // swap pending & checked queue
        checkPending = aliveChecked;
        aliveChecked = new HashMap<Long, Heartbeat>();
    }
}
