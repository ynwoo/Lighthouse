package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.StudyDto;
import com.ssafy.lighthouse.domain.study.entity.Study;
import com.ssafy.lighthouse.domain.study.exception.StudyNotFoundException;
import com.ssafy.lighthouse.domain.study.repository.StudyRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
class StudyServiceImplTest {

    @Autowired
    private StudyRepository studyRepository;

    @PersistenceContext
    private EntityManager em;

    @Test
    public void createById() {
        Optional<Study> result = studyRepository.findDetailById(140);
        log.debug("service - findDetailById : {}", result);
        Study study = result.orElseThrow(StudyNotFoundException::new);
        Study save = studyRepository.save(study);
        em.flush();
        em.clear();
        studyRepository.findById()
        assertThat(study).isEqualTo(save);
        log.debug("service - createById {}", new StudyDto(save));
    }

}