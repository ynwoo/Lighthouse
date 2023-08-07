package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.study.entity.ParticipationHistory;
import com.ssafy.lighthouse.domain.study.entity.Study;
import com.ssafy.lighthouse.domain.study.exception.ParticipationHistoryException;
import com.ssafy.lighthouse.domain.study.exception.StudyNotFoundException;
import com.ssafy.lighthouse.domain.study.repository.ParticipationHistoryRepository;
import com.ssafy.lighthouse.domain.study.repository.StudyRepository;
import com.ssafy.lighthouse.global.util.ERROR;
import com.ssafy.lighthouse.global.util.STATUS;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ParticipationHistoryServiceImpl implements ParticipationHistoryService {
    private final ParticipationHistoryRepository participationHistoryRepository;
    private final StudyRepository studyRepository;


    @Override
    public void participateStudy(Long studyId, Long userId) {
        Optional<ParticipationHistory> participationHistory = participationHistoryRepository.find(studyId, userId);

        // 이미 신청 했으면 exception
        if(participationHistory.isPresent()){
            System.out.println("participationHistory.get() = " + participationHistory.get());
            throw new ParticipationHistoryException(ERROR.FIND);
        }

        // 스터디 참여 신청 (status = STATUS.PREPARING)
        participationHistoryRepository.save(ParticipationHistory.builder()
                .userId(userId)
                .studyId(studyId)
                .status(STATUS.PREPARING)
                .build());

    }

    @Override
    public void joinStudy(Long studyId, Long userId) {
        ParticipationHistory participationHistory = participationHistoryRepository.find(studyId, userId).orElseThrow(() -> new ParticipationHistoryException(ERROR.FIND));

        // 스터디 가입 (status = STATUS.ON_PROGRESS)
        participationHistory.changeStatus(STATUS.PROGRESS);

        // 스터디 인원 증가
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new StudyNotFoundException(ERROR.FIND));
        
        // 최대 인원 초과시 가입 불가
        if(study.getMaxMember() == study.getCurrentMember()) {
            throw new ParticipationHistoryException(ERROR.UPDATE + " 최대 인원 초과");
        }
        study.addMember();
    }

    @Override
    public void leaveStudy(Long studyId, Long userId) {
        ParticipationHistory participationHistory = participationHistoryRepository.find(studyId, userId).orElseThrow(() -> new ParticipationHistoryException(ERROR.FIND));

        // 스터디 탈퇴 (status = STATUS.LEAVED)
        participationHistory.changeStatus(STATUS.LEAVED);

        // 스터디 인원 감소
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new StudyNotFoundException(ERROR.FIND));
        study.removeMember();
    }
}
