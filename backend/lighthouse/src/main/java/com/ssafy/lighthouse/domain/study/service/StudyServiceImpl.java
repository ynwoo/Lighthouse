package com.ssafy.lighthouse.domain.study.service;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.common.dto.BadgeRequest;
import com.ssafy.lighthouse.domain.common.entity.Badge;
import com.ssafy.lighthouse.domain.common.exception.BadgeException;
import com.ssafy.lighthouse.domain.common.repository.BadgeRepository;
import com.ssafy.lighthouse.domain.common.service.BadgeService;
import com.ssafy.lighthouse.domain.study.dto.*;
import com.ssafy.lighthouse.domain.study.entity.*;
import com.ssafy.lighthouse.domain.study.exception.*;
import com.ssafy.lighthouse.domain.study.repository.*;
import com.ssafy.lighthouse.domain.user.entity.UserBadge;
import com.ssafy.lighthouse.domain.user.repository.UserBadgeRepository;
import com.ssafy.lighthouse.domain.user.repository.UserRepository;
import com.ssafy.lighthouse.global.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService {
    private final StudyRepository studyRepository;
    private final StudyTagRepository studyTagRepository;
    private final StudyMaterialRepository studyMaterialRepository;
    private final StudyNoticeRepository studyNoticeRepository;
    private final StudyNoticeCheckRepository studyNoticeCheckRepository;
    private final SessionRepository sessionRepository;
    private final SessionCheckRepository sessionCheckRepository;
    private final StudyLikeRepository studyLikeRepository;
    private final BookmarkRepository bookmarkRepository;
    private final StudyEvalRepository studyEvalRepository;
    private final ParticipationHistoryRepository participationHistoryRepository;
    private final UserRepository userRepository;
    private final BadgeService badgeService;
    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final EntityManager em;

    private final StudyMaterialService studyMaterialService;


    @Override
    @Transactional(readOnly = true)
    public Page<SimpleStudyDto> findAllByStudySearchOption(StudySearchOption options) {
        return studyRepository.findAllByStudySearchOption(options);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<SimpleStudyDto> findAllByOriginalId(Long originalId, StudySearchOption options) {
        return studyRepository.findAllByOriginalId(originalId , PageRequest.of(options.getPage() - 1, PAGE.LIMIT));
    }

    // 결과값이 null 이면 StudyNotFoundException을 전달한다.
    @Override
    @Transactional(readOnly = true)
    public StudyResponse findDetailByStudyId(Long studyId) {
        Study study = studyRepository.findDetailById(studyId).orElseThrow(() -> new StudyNotFoundException(ERROR.FIND));
        log.debug("service - studyId : {}", studyId);
        log.debug("service - findDetailById : {}", study.getId());
        StudyResponse studyResponse = new StudyResponse(study);

        int status = studyResponse.getStatus();

        // setLeaderProfile
        studyResponse.setLeaderProfile(userRepository.findSimpleProfileByUserId(study.getLeaderId()));

        // setMemberProfile
        studyResponse.setMemberProfiles(userRepository.findSimpleProfileByUserIds(study.getParticipations()
                .stream()
                .filter(BaseEntity::isValid)
                .filter(participationHistory -> participationHistory.checkStatus(status))
                .map(ParticipationHistory::getUserId)
                .collect(Collectors.toList())));
        return studyResponse;
    }
    
    // 스터디 복제
    @Override
    public StudyResponse createStudyByStudyId(Long studyId, Long userId) {
        Optional<Study> findDetail = studyRepository.findSimpleDetailById(studyId);
        log.debug("service1 - findDetailById : {}", findDetail);
        Study study = findDetail.orElseThrow(() -> new StudyNotFoundException(ERROR.CREATE));
        
        // 새로운 스터디 만들기
        Study newStudy = studyRepository.save(Study.builder()
                .isValid(study.getIsValid())
                .title(study.getTitle())
                .description(study.getDescription())
                .hit(study.getHit())
                .rule(study.getRule())
                .isOnline(study.getIsOnline())
                .originalId(study.getId())
                .leaderId(userId)
                .build());

        log.debug("service2 - studyId : {}", study.getId());
        log.debug("service3 - savedStudyId : {}", newStudy.getId());
        
        // newStudyId
        Long newStudyId = newStudy.getId();
        // studyTag 넣기
        studyTagRepository.saveAll(study.getStudyTags()
                .stream()
                .map(studyTag -> StudyTag.builder()
                        .isValid(studyTag.getIsValid())
                        .studyId(newStudyId)
                        .tag(studyTag.getTag())
                        .build())
                .collect(Collectors.toSet()));

        // session
        Set<Session> sessions = study.getSessions();
        sessionRepository.saveAll(sessions
                .stream()
                .map(session -> Session.builder()
                        .isValid(session.getIsValid())
                        .studyId(newStudyId)
                        .title(session.getTitle())
                        .description(session.getDescription())
                        .comment(session.getComment())
                        .seqNum(session.getSeqNum())
                        .build())
                .collect(Collectors.toSet()));

        // studyMaterial
        Set<StudyMaterial> studyMaterials = new HashSet<>();
        sessions.forEach(session -> studyMaterials.addAll(session.getStudyMaterials()
                .stream()
                .map(studyMaterial -> StudyMaterial.builder()
                        .isValid(studyMaterial.getIsValid())
                        .studyId(newStudyId)
                        .sessionId(session.getId())
                        .content(studyMaterial.getContent())
                        .type(studyMaterial.getType())
                        .fileUrl(studyMaterial.getFileUrl())
                        .build())
                .collect(Collectors.toSet())));

        studyMaterialRepository.saveAll(studyMaterials);

        // studyNotice
        Set<StudyNotice> studyNotices = study.getStudyNotices();
        studyNoticeRepository.saveAll(studyNotices
                .stream()
                .map(studyNotice -> StudyNotice.builder()
                        .isValid(studyNotice.getIsValid())
                        .studyId(newStudyId)
                        .content(studyNotice.getContent())
                        .build())
                .collect(Collectors.toSet()));

        // 스터디 참여 기록 등록(팀장)
        participationHistoryRepository.save(ParticipationHistory
                .builder()
                .userId(userId)
                .studyId(newStudy.getId())
                .status(STATUS.PREPARING)
                .userRole(ROLE.TEAM_LEADER)
                .joinedAt(LocalDateTime.now())
                .build());

        StudyResponse studyResponse = new StudyResponse(newStudy);
        // setLeaderProfile
        studyResponse.setLeaderProfile(userRepository.findSimpleProfileByUserId(userId));
        return studyResponse;
    }

    @Override
    public void removeStudyByStudyId(Long studyId) {
        Optional<Study> result = studyRepository.findById(studyId);
        Study study = result.orElseThrow(() -> new StudyNotFoundException(ERROR.REMOVE));
        study.remove();
    }

    @Override
    public void shareStudyByStudyId(Long studyId) {
        Optional<Study> result = studyRepository.findById(studyId);
        Study study = result.orElseThrow(() -> new StudyNotFoundException(ERROR.UPDATE));
        study.share();
    }

    // 변경사항이 있으면 update 진행
    @Override
    public StudyResponse updateStudyByStudyId(StudyRequest studyRequest, Long userId) {
        Study changedStudy = studyRequest.toEntity();
        Study study = studyRepository.findDetailById(studyRequest.getId()).orElseThrow(StudyNotFoundException::new);
        log.debug("studyId : {}", study.getId());

        int prevStatus = study.getStatus();
        int curStatus = studyRequest.getStatus();
        log.debug("prevStatus : {}", prevStatus);
        log.debug("curStatus : {}", curStatus);

        study.update(changedStudy);

        // studyEval
        Set<StudyEval> studyEvals = study.getStudyEvals();
        Set<StudyEval> newStudyEvals = new HashSet<>();
        studyRequest.getStudyEvals().forEach(changedStudyEval -> {
            Optional<StudyEval> result = studyEvals
                    .stream()
                    .filter(studyEval -> studyEval.getId().equals(changedStudyEval.getId()))
                    .findFirst();

            // 있으면 update
            if(result.isPresent()) {
                StudyEval studyEval = result.get();
                studyEval.update(
                        changedStudyEval.getStudyId(),
                        changedStudyEval.getUserId(),
                        changedStudyEval.getComment(),
                        changedStudyEval.getScore());
                studyEval.changeIsValid(changedStudyEval.getIsValid());
            }
            // 없으면 save
            else {
                newStudyEvals.add(changedStudyEval.toEntity());
            }
        });
        studyEvalRepository.saveAll(newStudyEvals);

        // studyTag
        Set<StudyTag> studyTags = study.getStudyTags();
        Set<StudyTag> newStudyTags = new HashSet<>();
        studyRequest.getStudyTags().forEach(changedStudyTag -> {
            Optional<StudyTag> result = studyTags
                    .stream()
                    .filter(studyTag -> studyTag.getId().equals(changedStudyTag.getId()))
                    .findFirst();

            // 있으면 update
            if(result.isPresent()) {
                StudyTag studyTag = result.get();
                studyTag.update(
                        changedStudyTag.getStudyId(),
                        changedStudyTag.getTag().toEntity());
                studyTag.changeIsValid(changedStudyTag.getIsValid());
            }
            // 없으면 save
            else {
                newStudyTags.add(changedStudyTag.toEntity());
            }
        });
        studyTagRepository.saveAll(newStudyTags);

        // studyNotice & studyNoticeCheck
        Set<StudyNotice> studyNotices = study.getStudyNotices();
        Set<StudyNotice> newStudyNotices = new HashSet<>();
        Set<StudyNoticeCheck> newStudyNoticeChecks = new HashSet<>();
        studyRequest.getStudyNotices().forEach(changedStudyNotice -> {
            Optional<StudyNotice> result = studyNotices
                    .stream()
                    .filter(studyNotice -> studyNotice.getId().equals(changedStudyNotice.getId()))
                    .findFirst();

            // 있으면 update
            if(result.isPresent()) {
                StudyNotice studyNotice = result.get();
                studyNotice.update(
                        changedStudyNotice.getStudyId(),
                        changedStudyNotice.getContent());
                studyNotice.changeIsValid(changedStudyNotice.getIsValid());

                Set<StudyNoticeCheck> studyNoticeChecks = studyNotice.getStudyNoticeChecks();
                changedStudyNotice.getStudyNoticeChecks().forEach(changedStudyNoticeCheck -> {
                    Optional<StudyNoticeCheck> checkResult = studyNoticeChecks
                            .stream()
                            .filter(studyNoticeCheck -> studyNoticeCheck.getId().equals(changedStudyNoticeCheck.getId()))
                            .findFirst();

                    // 있으면 update
                    if(checkResult.isPresent()) {
                        StudyNoticeCheck studyNoticeCheck = checkResult.get();
                        studyNoticeCheck.changeIsValid(changedStudyNoticeCheck.getIsValid());
                    }

                    // 없으면 save
                    else {
                        newStudyNoticeChecks.add(changedStudyNoticeCheck.toEntity());
                    }
                });
            }
            // 없으면 save
            else {
                newStudyNotices.add(changedStudyNotice.toEntity());
            }
        });
        studyNoticeRepository.saveAll(newStudyNotices);
        studyNoticeCheckRepository.saveAll(newStudyNoticeChecks);

        // session & sessionCheck & studyMaterial
        Set<Session> sessions = study.getSessions();
        Set<Session> newSessions = new HashSet<>();
        Set<SessionCheck> newSessionChecks = new HashSet<>();
        Set<StudyMaterial> newStudyMaterials = new HashSet<>();
        studyRequest.getSessions().forEach(changedSession -> {
            Optional<Session> result = sessions
                    .stream()
                    .filter(session -> session.getId().equals(changedSession.getId()))
                    .findFirst();

            // 있으면 update
            if(result.isPresent()) {
                Session session = result.get();
                session.update(
                        changedSession.getStartedAt(),
                        changedSession.getEndedAt(),
                        changedSession.getStudyId(),
                        changedSession.getTitle(),
                        changedSession.getDescription(),
                        changedSession.getComment(),
                        changedSession.getStatus(),
                        changedSession.getSeqNum());
                session.changeIsValid(changedSession.getIsValid());

                // sessionCheck 시작
                Set<SessionCheck> sessionChecks = session.getSessionChecks();
                changedSession.getSessionChecks().forEach(changedSessionCheck -> {
                    Optional<SessionCheck> checkResult = sessionChecks
                            .stream()
                            .filter(sessionCheck -> sessionCheck.getId().equals(changedSessionCheck.getId()))
                            .findFirst();

                    // 있으면 update
                    if(checkResult.isPresent()) {
                        SessionCheck sessionCheck = checkResult.get();
                        sessionCheck.update(
                                changedSessionCheck.getUserId(),
                                changedSessionCheck.getSessionId(),
                                changedSessionCheck.getContent()
                        );
                        sessionCheck.changeIsValid(changedSessionCheck.getIsValid());
                    }

                    // 없으면 save
                    else {
                        newSessionChecks.add(changedSessionCheck.toEntity());
                    }
                });
                // sessionCheck 끝

                // studyMaterial 시작
                Set<StudyMaterial> studyMaterials = session.getStudyMaterials();
                changedSession.getStudyMaterials().forEach(changedStudyMaterial -> {
                    Optional<StudyMaterial> checkResult = studyMaterials
                            .stream()
                            .filter(studyMaterial -> studyMaterial.getId().equals(changedStudyMaterial.getId()))
                            .findFirst();

                    // 있으면 update
                    if(checkResult.isPresent()) {
                        StudyMaterial targetStudyMaterial = checkResult.get();
                        studyMaterialService.updateMaterial(targetStudyMaterial, changedStudyMaterial);
                        targetStudyMaterial.changeIsValid(changedStudyMaterial.getIsValid());
                    }

                    // 없으면 save
                    else {
                        newStudyMaterials.add(changedStudyMaterial.toEntity());
                    }
                });
                // studyMaterial 끝

            }
            // 없으면 save
            else {
                Session session = changedSession.toEntity();
                newSessions.add(session);
                newSessionChecks.addAll(session.getSessionChecks());
                newStudyMaterials.addAll(session.getStudyMaterials());
            }
        });
        sessionRepository.saveAll(newSessions);
        sessionCheckRepository.saveAll(newSessionChecks);
        studyMaterialRepository.saveAll(newStudyMaterials);

        log.debug("studyRequest.getId() : {}", studyRequest.getId());


        // status 변동 없으면 그냥 두기
        if(prevStatus != curStatus) {
            
            // 스터디가 모집 시작하면 팀장 기록 수정
            if(curStatus == STATUS.RECRUITING) {
                participationHistoryRepository.findAllByStudyId(studyRequest.getId(), STATUS.PREPARING)
                        .forEach(participationHistory -> participationHistory.changeStatus(STATUS.RECRUITING));
            }

            // 스터디가 시작하면 팀 전원의 기록 수정
            else if(curStatus == STATUS.PROGRESS) {
                participationHistoryRepository.findAllByStudyId(studyRequest.getId(), STATUS.RECRUITING)
                        .forEach(participationHistory -> participationHistory.changeStatus(STATUS.PROGRESS));
            }

            // 스터디가 끝나면 팀 전원의 기록 수정 & 뱃지 지급
            else if(curStatus == STATUS.TERMINATED) {

                // 스터디에 해당하는 뱃지 확인
                Badge badge = badgeRepository.findByBadgeId(studyRequest.getBadge().getId()).orElseThrow(BadgeException::new);
                List<UserBadge> newUserBadges = new ArrayList<>();

                participationHistoryRepository.findAllByStudyId(studyRequest.getId(), STATUS.PROGRESS)
                        .forEach(participationHistory -> {
                            // 기록 수정
                            participationHistory.changeStatus(STATUS.TERMINATED);

                            // 뱃지 지급
                            newUserBadges.add(UserBadge.builder()
                                    .badge(badge)
                                    .userId(participationHistory.getUserId())
                                    .build());
                        });

                // 뱃지 지급
                userBadgeRepository.saveAll(newUserBadges);
            }
        }


        em.flush();
        em.clear();

        return new StudyResponse(studyRepository.findDetailById(studyRequest.getId())
                .orElseThrow(StudyNotFoundException::new));
    }

    @Override
    public void createStudyLike(Long studyId, Long userId) {
        Optional<StudyLike> result = studyLikeRepository.find(studyId, userId);
        if(result.isPresent()) {
            throw new StudyLikeException(ERROR.CREATE);
        }

        // 좋아요 등록
        studyLikeRepository.save(new StudyLike(studyId, userId));

        // study - likeCnt 증가
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new StudyNotFoundException(ERROR.FIND));
        study.addLike();
    }

    @Override
    public void removeStudyLike(Long studyId, Long userId) {
        // 좋아요 삭제
        Optional<StudyLike> result = studyLikeRepository.find(studyId, userId);
        result.orElseThrow(() -> new StudyLikeException(ERROR.REMOVE)).remove();

        // study - likeCnt 감소
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new StudyNotFoundException(ERROR.FIND));
        study.removeLike();
    }

    @Override
    public List<Long> findStudyLikeAllByUserId(Long userId) {
        return studyLikeRepository.findAllByUserId(userId);
    }

    @Override
    public void createStudyBookmark(Long studyId, Long userId) {
        Optional<Bookmark> result = bookmarkRepository.find(studyId, userId);
        if(result.isPresent()) {
            throw new BookmarkException(ERROR.CREATE);
        }

        // 북마크 등록
        bookmarkRepository.save(new Bookmark(studyId, userId));

        // study - bookmarkCnt 증가
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new StudyNotFoundException(ERROR.FIND));
        study.addBookmark();
    }

    @Override
    public void removeStudyBookmark(Long studyId, Long userId) {
        // 북마크 삭제
        Optional<Bookmark> result = bookmarkRepository.find(studyId, userId);
        result.orElseThrow(() -> new StudyLikeException(ERROR.REMOVE)).remove();

        // study - bookmarkCnt 감소
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new StudyNotFoundException(ERROR.FIND));
        study.removeBookmark();
    }

    @Override
    public void createStudyEval(StudyEvalDto studyEvalDto) {
        Optional<StudyEval> result = studyEvalRepository.find(studyEvalDto.getStudyId(), studyEvalDto.getUserId());
        if(result.isPresent()) {
            throw new StudyEvalException(ERROR.CREATE);
        }
        studyEvalRepository.save(studyEvalDto.toEntity());
    }

    @Override
    public void removeStudyEval(Long studyId, Long userId) {
        Optional<StudyEval> result = studyEvalRepository.find(studyId, userId);
        result.orElseThrow(() -> new StudyEvalException(ERROR.REMOVE)).remove();
    }

    @Override
    public void createStudyTag(StudyTagDto studyTagDto) {
        Optional<StudyTag> result = studyTagRepository.find(studyTagDto.getStudyId(), studyTagDto.getTag().getId());
        if(result.isPresent()) {
            throw new StudyTagException(ERROR.CREATE);
        }
        studyTagRepository.save(studyTagDto.toEntity());
    }

    @Override
    public void removeStudyTag(Long studyId, Long tagId) {
        Optional<StudyTag> result = studyTagRepository.find(studyId, tagId);
        result.orElseThrow(() -> new StudyTagException(ERROR.REMOVE)).remove();
    }

    @Override
    public void updateStudyBadge(BadgeRequest badgeRequest, MultipartFile img, Long studyId) {
        Study study = studyRepository.findById(studyId).orElseThrow(() -> new StudyNotFoundException(ERROR.FIND));
        Badge badge = study.getBadge();

        // 기존 badge 삭제
        if(badge != null) {
            badgeService.removeBadge(badge.getId());
        }

        // 새로운 badge 생성 & 스터디 badgeId 변경
        study.changeBadge(badgeService.createBadge(badgeRequest, img));
    }
}
