package com.ssafy.lighthouse.domain.common.dto;

import com.ssafy.lighthouse.domain.common.entity.Gugun;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GugunDto {
    private Long id;
    private Long sidoId;
    private String name;

    public GugunDto(Gugun gugun) {
        this.id = gugun.getId();
        this.sidoId = gugun.getSidoId();
        this.name = gugun.getName();
    }
}
