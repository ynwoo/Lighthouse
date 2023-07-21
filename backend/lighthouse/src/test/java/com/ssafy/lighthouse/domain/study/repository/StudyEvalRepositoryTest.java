package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.StudyEval;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Optional;

@SpringBootTest
@Transactional
@Slf4j
class StudyEvalRepositoryTest {
    @Autowired
    private StudyEvalRepository studyEvalRepository;

    @PersistenceContext
    private EntityManager em;

    @Test
    public void studyEvalTest() {
        StudyEval save = studyEvalRepository.save(new StudyEval(1, 1, "", 1));

        em.flush();
        em.clear();

        Optional<StudyEval> studyEval = studyEvalRepository.find(1, 1);
        studyEval.get().remove();
        log.debug("studyEval : {}", studyEval);

        em.flush();
        em.clear();

    }
}