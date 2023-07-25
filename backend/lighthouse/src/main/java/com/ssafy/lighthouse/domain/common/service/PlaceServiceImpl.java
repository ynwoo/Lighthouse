package com.ssafy.lighthouse.domain.common.service;

import com.ssafy.lighthouse.domain.common.dto.SidoDto;
import com.ssafy.lighthouse.domain.common.repository.GugunRepository;
import com.ssafy.lighthouse.domain.common.repository.SidoRepository;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaceServiceImpl implements PlaceService {

    private SidoRepository sidoRepository;
    private GugunRepository gugunRepository;

    @Autowired
    public PlaceServiceImpl(SidoRepository sidoRepository, GugunRepository gugunRepository) {
        this.sidoRepository = sidoRepository;
        this.gugunRepository = gugunRepository;
    }

    @Override
    public List<SidoDto> getAllSido() {
        return sidoRepository.findAllSidoList();
    }

    @Override
    public Map<Integer, String> convertDtoListToMap(List<SidoDto> sidoList) {
        Map<Integer, String> map = new LinkedHashMap<>();
        for(SidoDto sidoDto : sidoList) {
            map.put(sidoDto.getId(), sidoDto.getName());
        }
        return map;
    }

    @Override
    public Map<Integer, String> getAllGugunBySidoId(Integer sidoId) {
        List<Object[]> gugunByIdSidoOrderById = gugunRepository.findGugunByIdSidoOrderById(sidoId);
        Map<Integer, String> map = new LinkedHashMap<>();
        for(Object[] ob : gugunByIdSidoOrderById) {
            map.put(Integer.parseInt(ob[0].toString()), ob[1].toString());
        }
        return map;
    }
}
