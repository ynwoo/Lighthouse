package com.ssafy.lighthouse.domain.common.dto;

import com.ssafy.lighthouse.domain.common.entity.Sido;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class SidoDto {
    private Long id;
    private String name;

    public SidoDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public SidoDto(Sido sido) {
        this.id = sido.getId();
        this.name = sido.getName();
    }

    public Sido toEntity() {
        return Sido.builder()
                .id(this.id)
                .name(this.name)
                .build();
    }
}
