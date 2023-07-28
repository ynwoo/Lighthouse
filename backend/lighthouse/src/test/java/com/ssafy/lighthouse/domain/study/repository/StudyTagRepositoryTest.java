package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.common.entity.Tag;
import com.ssafy.lighthouse.domain.study.entity.StudyTag;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@Transactional
@Slf4j
//@Rollback(value = false)
class StudyTagRepositoryTest {

    @Autowired
    private StudyTagRepository studyTagRepository;

    @PersistenceContext
    private EntityManager em;

    @BeforeEach
    public void init() {
//        studyTagRepository.save(new StudyTag(1L, 1L));
//        studyTagRepository.save(new StudyTag(2L, 1L));
//        studyTagRepository.save(new StudyTag(3L, 1L));
//        studyTagRepository.save(new StudyTag(4L, 1L));
        em.flush();
        em.clear();
    }

    @Test
    public void findAll() {
        List<StudyTag> findAll = studyTagRepository.findAll();
        for (StudyTag studyTag : findAll) {
            System.out.println("studyId = " + studyTag.getStudyId());
        }
    }

    @Test
    public void studyTagUpdateTest() {
//        Optional<StudyTag> studyTag = studyTagRepository.find(1L, 1L);
    }
}