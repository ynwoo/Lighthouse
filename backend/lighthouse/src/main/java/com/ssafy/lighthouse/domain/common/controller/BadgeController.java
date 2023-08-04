package com.ssafy.lighthouse.domain.common.controller;

import com.ssafy.lighthouse.domain.common.dto.BadgeRequest;
import com.ssafy.lighthouse.domain.common.dto.BadgeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/badge")
public class BadgeController {

    public ResponseEntity<?> createBadge(@RequestPart BadgeRequest badgeRequest) {


        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
