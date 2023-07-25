package com.ssafy.lighthouse.domain.common.controller;

import com.ssafy.lighthouse.domain.common.dto.SidoDto;
import com.ssafy.lighthouse.domain.common.service.PlaceService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/places")
public class PlaceController {
    private PlaceService placeService;

    @Autowired
    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }

    @GetMapping("/sido")
    public ResponseEntity<Map<Long, String>> getAllsido() {
        List<SidoDto> sidoList = placeService.getAllSido();
        Map<Long, String> sidoMap = placeService.convertDtoListToMap(sidoList);
        return ResponseEntity.ok(sidoMap);
    }

    @GetMapping("/gugun/{sidoId}")
    public ResponseEntity<Map<Long, String>> getAllGugunBySidoId(@PathVariable Long sidoId) {
        Map<Long, String> gugunMap = placeService.getAllGugunBySidoId(sidoId);
        return ResponseEntity.ok(gugunMap);
    }
}
