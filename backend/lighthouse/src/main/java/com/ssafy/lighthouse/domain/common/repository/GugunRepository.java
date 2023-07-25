package com.ssafy.lighthouse.domain.common.repository;

import com.ssafy.lighthouse.domain.common.entity.Gugun;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GugunRepository extends JpaRepository<Gugun, Integer> {
    @Query("SELECT g.id, g.name FROM Gugun g WHERE g.sidoId = :sidoId ORDER BY g.sidoId, g.id")
    List<Object[]> findGugunByIdSidoOrderById(@Param("sidoId") Integer sidoId);
}
