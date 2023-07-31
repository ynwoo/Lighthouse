package com.ssafy.lighthouse.domain.heartbeat.controller;

import com.ssafy.lighthouse.domain.heartbeat.service.HeartbeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class HeartbeatController {

    private final HeartbeatService heartbeatService;

    @GetMapping("/heartbeat/{id}")
    public ResponseEntity<Object> heartbeat(@PathVariable("id") Long id) {
        heartbeatService.updateHeartbeat(id);
        return ResponseEntity.ok().build();
    }

}
