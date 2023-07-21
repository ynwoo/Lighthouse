package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.StudyTag;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
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

    @Test
    public void studyTagSaveTest() {
        StudyTag studyTag = new StudyTag(1,1);
        log.debug("studyTag ----------------------- {}", studyTag);

        StudyTag save = studyTagRepository.save(studyTag);
        log.debug("save ----------------------- {}", save);

//        Optional<StudyTag> findStudyTag = studyTagRepository.findByStudyIdAndTagIdAndIsValid(1, 1);
//        log.debug("findStudyTag ----------------------- {}", findStudyTag);
//
//        Assertions.assertThat(studyTag).isEqualTo(findStudyTag.get());

    }

    @Test
    public void studyTagUpdateTest() {
        StudyTag studyTag = new StudyTag(1,1);
        log.debug("studyTag ----------------------- {}", studyTag);

        StudyTag save = studyTagRepository.save(studyTag);
        log.debug("save ----------------------- {}", save);


        em.flush();
        em.clear();

        Optional<StudyTag> studyTag1 = studyTagRepository.find(1, 1);


    }

}