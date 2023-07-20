package com.ssafy.lighthouse.domain.study.repository;

import com.ssafy.lighthouse.domain.study.entity.Bookmark;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;

@SpringBootTest
@Transactional
@Slf4j
class BookmarkRepositoryTest {

    @Autowired
    private BookmarkRepository bookmarkRepository;


    @Test
    public void bookmarkTest() {
        Bookmark bookmark = new Bookmark(1,1);
        log.debug("bookmark ----------------- {}", bookmark);
//        List<Bookmark> findAll = bookmarkRepository.findAll();
        List<Bookmark> findAll = bookmarkRepository.findAll();
        log.debug("findAll ----------------- {}", findAll);
//        Assertions.assertThat(bookmark).isEqualTo(findBookmark);
    }
}