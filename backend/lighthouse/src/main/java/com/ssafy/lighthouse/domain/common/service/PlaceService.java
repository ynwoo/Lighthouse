package com.ssafy.lighthouse.domain.common.service;

import com.ssafy.lighthouse.domain.common.dto.SidoDto;
import java.util.List;
import java.util.Map;

public interface PlaceService {

    List<SidoDto> getAllSido();

    Map<Integer, String> convertDtoListToMap(List<SidoDto> sidoList);

    Map<Integer, String> getAllGugunBySidoId(Integer sidoId);
}
