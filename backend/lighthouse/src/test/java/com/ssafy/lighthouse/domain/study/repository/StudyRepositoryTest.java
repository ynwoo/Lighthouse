package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.dto.StudySearchOption;
import com.ssafy.lighthouse.domain.study.entity.Study;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
@Slf4j
class StudyRepositoryTest {

    @Autowired
    private StudyRepository studyRepository;


    @PersistenceContext
    private EntityManager em;

    @BeforeEach
    public void init() {
        studyRepository.save(new Study("aaa"));
        studyRepository.save(new Study("bbb"));
        studyRepository.save(new Study("ccc"));
        studyRepository.save(new Study("ddd"));

        em.flush();
        em.clear();
    }

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

    @Test
    public void studyQuerydsl() {
        List<Study> all = studyRepository.findAll();
        for (Study study : all) {
            System.out.println("study = " + study.getTitle());
        }
        Assertions.assertThat(all.size()).isEqualTo(4);

        StudySearchOption options = new StudySearchOption();
        options.setLimit(4);
        options.setOffset(1);

        List<Study> queryAll = studyRepository.findAllByStudySearchOption(options);
        for (Study study : queryAll) {
            System.out.println("studyTitle = " + study.getTitle());
            System.out.println("studyCreatedAt = " + study.getCreatedAt());
        }
        Assertions.assertThat(queryAll.size()).isEqualTo(3);
    }

}