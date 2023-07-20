package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.Like;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;

@SpringBootTest
@Transactional
@Slf4j
class LikeRepositoryTest {

    @Autowired
    private LikeRepository likeRepository;

    @Test
    public void likeTest() {
//        Like save = likeRepository.save(new Like());
        List<Like> findAll = likeRepository.findAll();
        log.debug("findAll ------------------------- {}", findAll);
        Assertions.assertThat(findAll.size()).isEqualTo(0);
    }
}