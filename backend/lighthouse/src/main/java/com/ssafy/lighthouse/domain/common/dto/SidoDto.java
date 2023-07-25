package com.ssafy.lighthouse.domain.common.dto;

import com.ssafy.lighthouse.domain.common.entity.Sido;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class SidoDto {
    private Long id;
    private String name;

    public SidoDto(Sido sido) {
        this.id = sido.getId();
        this.name = sido.getName();
    }
}
