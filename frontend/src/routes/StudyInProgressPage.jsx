import React, { useEffect } from 'react'
import { Row, Col, Tag, Tabs, Tooltip, Button } from 'antd'
import {
  faBookmark as faBookmarkSolid,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons'
import {
  faBookmark as faBookmarkRegular,
  faHeart as faHeartRegular,
} from '@fortawesome/free-regular-svg-icons'

import { useDispatch, useSelector } from 'react-redux'
// import SideComponent from '../components/Utils/SideComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StudyInfo from '../components/Study/StudyInfo'
import { studyAction } from '../store/study'
import { userAction } from '../store/user'
import { coverImage } from '../utils/image'
import UserName from '../components/Study/UserName'
import StudyCurrent from '../components/Study/StudyCurrent'
import StudyRecord from '../components/Study/StudyRecord'
import { STATUS } from '../utils'
import { updateStudyStatus } from '../api/study'
import StudyMember from '../components/Study/StudyMember'

export default function StudyInProgressPage() {
  const dispatch = useDispatch()
  const studyId = window.location.pathname?.split('/')[2]
  const study = useSelector(state => state.study.studyDetail)

  // eslint-disable-next-line react/no-unstable-nested-components, react/jsx-props-no-spreading

  useEffect(() => {
    dispatch(studyAction.studyDetail(studyId))
    dispatch(userAction.profile(sessionStorage.getItem('userId')))
    dispatch(studyAction.getLike())
  }, [])
  const myInfo = useSelector(state => state.user.myProfile)
  const likeList = useSelector(state => state.study.likeList)

  // 해당 스터디 가입한 사람과 그렇지 않은 사람 구분
  const tabMenu = [
    { '진행 상황': <StudyCurrent study={study} /> },
    { 정보: <StudyInfo study={study} /> },
    { '스터디원 정보': <StudyMember members={study?.memberProfiles} /> },
    { 기록: <StudyRecord study={study} /> },
  ]

  const handleChangeStatus = () => {
    let { status } = study
    if (study.status === STATUS.PREPARING) {
      status = STATUS.RECRUITING
    } else if (study.status === STATUS.RECRUITING) {
      status = STATUS.PROGRESS
    } else if (study.status === STATUS.PROGRESS) {
      status = STATUS.TERMINATED
    } else if (study.status === STATUS.TERMINATED) {
      status = STATUS.SHARE
    }
    updateStudyStatus(
      { studyId: study.id, status },
      () => {
        dispatch(studyAction.studyDetail(study.id))
      },
      () => {},
    )
  }
  let buttonMessage = ''
  if (study.status === STATUS.PREPARING) {
    buttonMessage = '모집 시작'
  } else if (study.status === STATUS.RECRUITING) {
    buttonMessage = '스터디 시작'
  } else if (study.status === STATUS.PROGRESS) {
    buttonMessage = '스터디 종료'
  } else if (study.status === STATUS.TERMINATED) {
    buttonMessage = '스터디 공유'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Row
          style={{
            backgroundColor: 'rgb(218, 230, 255)',
            height: '300px',
            padding: '40px',
          }}
        >
          <Col xs={24} sm={24} md={10} style={{ marginRight: '40px' }}>
            <img
              style={{
                width: '100%',
                height: '220px',
                marginLeft: '50%',
                transform: 'translateX(-50%)',
                objectFit: 'cover',
              }}
              src={coverImage(study.coverImgUrl)}
              alt="coverImage"
            />
          </Col>
          <Col
            style={{
              padding: '30px 0 0 0',
            }}
          >
            <h1 style={{ height: '40px' }}>{study.title}</h1>
            <p style={{ fontSize: '16px' }}>
              스터디장: <UserName user={study.leaderProfile} />{' '}
            </p>
            <p style={{ marginTop: '30px' }}>
              {study.isOnline
                ? '온라인'
                : study.sido && study.gugun
                ? `오프라인: 장소 - ${study.sido}, ${study.gugun}`
                : '오프라인'}
              <br />
              현재 인원: {study.currentMemeber} 최대 인원: {study.maxMemeber}{' '}
              최소 인원: {study.minMemeber}
              <br />
              스터디 기간: <br />
              {study.startedAt} - {study.endedAt}
            </p>

            <div
              style={{
                fontSize: '12px',
                marginTop: '5px',
                height: '55px',
                overflow: 'hidden',
                marginBottom: '10px',
              }}
            >
              {study.studyTags.map(tag => {
                return (
                  <Tag
                    key={tag.id}
                    style={{
                      margin: '3px',
                    }}
                  >
                    #{tag.tag.keyword}
                  </Tag>
                )
              })}
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col span={18}>
            <Tabs
              items={tabMenu.map((menu, index) => {
                return {
                  label: Object.keys(menu),
                  key: index,
                  children: Object.values(menu),
                }
              })}
            />
          </Col>
          {/* 사이드바 */}
          <Col span={6} style={{ paddingTop: '40px' }} align="middle">
            <div
              style={{
                width: '80%',
                height: '160px',
                border: 'solid 1px',
                borderColor: ' rgb(216, 216, 216)',
                borderRadius: '5%',
                position: 'sticky',
                top: '70px',
                padding: '10px',
              }}
            >
              <p style={{ fontSize: '12px', textAlign: 'left' }}>
                진행 중인 스터디 입니다.
              </p>
              <div style={{ paddingTop: '30px' }}>
                {myInfo.id === study.leaderProfile.id ? (
                  <Button
                    type="primary"
                    style={{
                      width: '100%',
                    }}
                    onClick={handleChangeStatus}
                  >
                    {buttonMessage}
                  </Button>
                ) : (
                  <p />
                )}
              </div>
              <Row style={{ marginTop: '10px' }}>
                {myInfo.bookmarkStudies?.find(
                  bookmarkStudy => bookmarkStudy.id === study.id,
                ) ? (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.disbookmark(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(userAction.profile(myInfo.id))
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="북마크 취소">
                      <FontAwesomeIcon
                        className="blue"
                        icon={faBookmarkSolid}
                      />{' '}
                      {study.bookmarkCnt}
                    </Tooltip>
                  </Col>
                ) : (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.bookmark(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(userAction.profile(myInfo.id))
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="북마크">
                      <FontAwesomeIcon
                        className="blue"
                        icon={faBookmarkRegular}
                      />{' '}
                      {study.bookmarkCnt}
                    </Tooltip>
                  </Col>
                )}
                {likeList.find(id => id === study.id) ? (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.dislike(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(studyAction.getLike())
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="좋아요 취소">
                      <FontAwesomeIcon className="red" icon={faHeartSolid} />{' '}
                      {study.likeCnt}
                    </Tooltip>
                  </Col>
                ) : (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.like(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(studyAction.getLike())
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="좋아요">
                      <FontAwesomeIcon className="red" icon={faHeartRegular} />{' '}
                      {study.likeCnt}
                    </Tooltip>
                  </Col>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
