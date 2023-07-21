package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.Study;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Slf4j
class StudyRepositoryTest {

    @Autowired
    private StudyRepository studyRepository;

    @PersistenceContext
    private EntityManager em;

    @Test
    public void studyFindAllTest() {
        Study study = studyRepository.save(new Study("aaa"));
        log.debug("study save check : {}", study);
        List<Study> findAll = studyRepository.findAll();
    }

    @Test
    public void studyFindByIdTest() {
        Study study = studyRepository.save(new Study("aaa"));

        em.flush();
        em.clear();

        Study findStudy = studyRepository.findAll().get(0);

        Study findDetailById = studyRepository.findDetailById(findStudy.getId()).get();
    }
}