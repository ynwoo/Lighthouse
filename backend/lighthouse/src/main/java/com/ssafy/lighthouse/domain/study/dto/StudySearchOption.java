package com.ssafy.lighthouse.domain.study.dto;


import lombok.Data;

import java.util.List;

@Data
public class StudySearchOption {
    private int offset;
    private int limit;
    private String key;
    private String word;
    private String orderKey;
    private String orderBy;
    private int isOnline;
    private List<Integer> tags;
}
