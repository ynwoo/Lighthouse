package com.ssafy.lighthouse.domain.study.dto;


import com.ssafy.lighthouse.global.util.PAGE;
import lombok.Data;

import java.util.List;

@Data
public class StudySearchOption {
    private int page;
    private String key;
    private String word;
    private String orderKey;
    private String orderBy;
    private int isOnline;
    private List<Integer> tags;

    public int getOffset() {
        return (this.page - 1) * PAGE.LIMIT;
    }

    public int getLimit() {
        return PAGE.LIMIT;
    }
}
