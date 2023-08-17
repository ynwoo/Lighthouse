package com.ssafy.lighthouse.domain.study.service;

public interface ParticipationHistoryService {

    // 스터디 신청
    void participateStudy(Long studyId, Long userId);

    // 스터디 가입
    void joinStudy(Long studyId, Long userId);
    
    // 스터디 탈퇴
    void leaveStudy(Long studyId, Long userId);

    void rejectStudy(Long studyId, Long userId);
}
