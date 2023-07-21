package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.Bookmark;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@SpringBootTest
@Transactional
@Slf4j
class BookmarkRepositoryTest {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @PersistenceContext
    private EntityManager em;

    @Test
    public void bookmarkTest() {
        Bookmark bookmark = new Bookmark(1,1);

        Bookmark save = bookmarkRepository.save(bookmark);
//        List<Bookmark> findAll = bookmarkRepository.findAll();
        List<Bookmark> findAll = bookmarkRepository.findAll();
        log.debug("findAll ----------------- {}", findAll);
//        Assertions.assertThat(bookmark).isEqualTo(findBookmark);
    }

    @Test
    public void bookmarkSaveTest() {
        Bookmark bookmark = new Bookmark(1,1);

        Bookmark save = bookmarkRepository.save(bookmark);

        em.flush();
        em.clear();

        Optional<Bookmark> bookmark1 = bookmarkRepository.find(1, 1);

        log.debug("bookmark : {}", bookmark1.get());
        bookmark1.get().remove();



    }
}