package com.ssafy.lighthouse.domain.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SidoDto {

    private Integer id;
    private String name;

    public SidoDto(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}
