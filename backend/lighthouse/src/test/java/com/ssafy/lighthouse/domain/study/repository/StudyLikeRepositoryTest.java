package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.StudyLike;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

@SpringBootTest
@Transactional
@Slf4j
class StudyLikeRepositoryTest {

    @Autowired
    private StudyLikeRepository studyLikeRepository;

    @Test
    public void likeTest() {
        StudyLike save = studyLikeRepository.save(new StudyLike(1, 1));

//        int update = studyLikeRepository.update(1, 1);
//
//        Assertions.assertThat(update).isEqualTo(1);
    }
}