package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.StudyTag;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.transaction.Transactional;
import java.util.Optional;

@SpringBootTest
@Transactional
@Slf4j
//@Rollback(value = false)
class StudyTagRepositoryTest {

    @Autowired
    private StudyTagRepository studyTagRepository;

    @Test
    public void studyTagSaveTest() {
        StudyTag studyTag = new StudyTag(1,1);
        log.debug("studyTag ----------------------- {}", studyTag);

        StudyTag save = studyTagRepository.save(studyTag);
        log.debug("save ----------------------- {}", save);

        Optional<StudyTag> findStudyTag = studyTagRepository.findByStudyIdAndTagIdAndIsValid(1, 1);
        log.debug("findStudyTag ----------------------- {}", findStudyTag);

        Assertions.assertThat(studyTag).isEqualTo(findStudyTag.get());

    }

    @Test
    public void studyTagUpdateTest() {
        Optional<StudyTag> findStudyTag = studyTagRepository.findByStudyIdAndTagIdAndIsValid(1, 1);
        log.debug("findStudyTag ----------------------- {}", findStudyTag);
        findStudyTag.get().changeIsValidFalse();

        Optional<StudyTag> findStudyTag2 = studyTagRepository.findByStudyIdAndTagIdAndIsValid(1, 1);
        log.debug("findStudyTag2 ----------------------- {}", findStudyTag2);
    }

}