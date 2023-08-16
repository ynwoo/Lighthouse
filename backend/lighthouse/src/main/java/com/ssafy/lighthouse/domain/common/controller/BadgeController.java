package com.ssafy.lighthouse.domain.common.controller;

import com.ssafy.lighthouse.domain.common.dto.BadgeRequest;
import com.ssafy.lighthouse.domain.common.service.BadgeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/badge")
@Slf4j
public class BadgeController {

    private final BadgeService badgeService;

//    @PostMapping
//    public ResponseEntity<?> createBadge(@RequestPart(value = "badge") BadgeRequest badgeRequest,
//                                         @RequestPart(value = "img") MultipartFile img) {
//        log.debug("badge name : {} ", badgeRequest.getName());
//        log.debug("badge description : {} ", badgeRequest.getDescription());
//        badgeService.createBadge(badgeRequest, img);
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }

    @DeleteMapping("/{badge-id}")
    public ResponseEntity<?> removeBadge(@PathVariable(value = "badge-id") Long badgeId) {
        log.debug("badge id : {} ", badgeId);
        badgeService.removeBadge(badgeId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
