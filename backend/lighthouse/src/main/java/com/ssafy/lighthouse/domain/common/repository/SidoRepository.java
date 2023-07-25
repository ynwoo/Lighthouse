package com.ssafy.lighthouse.domain.common.repository;

import com.ssafy.lighthouse.domain.common.dto.SidoDto;
import com.ssafy.lighthouse.domain.common.entity.Sido;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SidoRepository extends JpaRepository<Sido, Long> {
    @Query("SELECT new com.ssafy.lighthouse.domain.common.dto.SidoDto(s.id, s.name) FROM Sido s")
    List<SidoDto> findAllSidoList();
}
