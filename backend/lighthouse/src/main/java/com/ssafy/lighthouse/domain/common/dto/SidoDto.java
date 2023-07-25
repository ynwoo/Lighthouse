package com.ssafy.lighthouse.domain.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SidoDto {

    private Long id;
    private String name;

    public SidoDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
