package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.dto.StudyResponse;
import com.ssafy.lighthouse.domain.study.entity.StudyTag;
import com.ssafy.lighthouse.domain.study.repository.StudyTagRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@SpringBootTest
@Transactional
@Slf4j
class StudyServiceImplTest {

    @Autowired
    private StudyService studyService;

    @Autowired
    private StudyTagRepository studyTagRepository;

    @PersistenceContext
    private EntityManager em;

    @BeforeEach
    public void init() {
        studyTagRepository.save(new StudyTag(224L, 1L));
        studyTagRepository.save(new StudyTag(224L, 2L));
        studyTagRepository.save(new StudyTag(224L, 3L));
        studyTagRepository.save(new StudyTag(224L, 4L));

        em.flush();
        em.clear();
    }

    @Test
    public void createById() {
        StudyResponse studyResponse = studyService.createStudyByStudyId(224L);
        log.debug("service - createById {}", studyResponse);
    }

}