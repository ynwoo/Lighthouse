import React, { useEffect } from 'react'
import { Row, Col, Tag, Tabs, Button, Tooltip } from 'antd'
import {
  HeartOutlined,
  HeartFilled,
  BookOutlined,
  BookFilled,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
// import SideComponent from '../components/Utils/SideComponent'
import StudyInfo from '../components/Study/StudyInfoNew'
import StudyQnA from '../components/Study/StudyQnA'
import StudyReview from '../components/Study/StudyReview'
import JoinStudyInfo from '../components/Study/join/JoinStudyInfo'
import StudyMember from '../components/Study/StudyMember'
import { studyAction } from '../store/study'
import { userAction } from '../store/user'
import { coverImage } from '../utils/image'
import UserName from '../components/Study/UserName'

export default function TempDetailPage({ isLoggedIn }) {
  const dispatch = useDispatch()
  const studyId = window.location.pathname?.split('/')[2]
  const study = useSelector(state => state.study.studyDetail)

  // eslint-disable-next-line react/no-unstable-nested-components, react/jsx-props-no-spreading
  console.log(study)

  useEffect(() => {
    dispatch(studyAction.studyDetail(studyId))
    dispatch(userAction.profile(sessionStorage.getItem('userId')))
    dispatch(studyAction.getLike())
  }, [])

  const myInfo = useSelector(state => state.user.myProfile)
  const likeList = useSelector(state => state.study.likeList)
  console.log(myInfo)
  console.log(likeList)
  const userId = sessionStorage.getItem('userId')
  console.log(study)
  console.log(userId, isLoggedIn)
  // 해당 스터디 가입한 사람과 그렇지 않은 사람 구분
  const tabMenu = [
    { 정보: <StudyInfo study={study} /> },
    ...(study?.memberProfiles?.find(
      memberProfile => memberProfile.id === Number(userId),
    )?.id
      ? [{ 가입했을때정보: <JoinStudyInfo study={study} /> }]
      : [
          { 'Q&A': <StudyQnA qnas={study?.qnas} /> },
          { '스터디원 정보': <StudyMember members={study?.memberProfiles} /> },
          { 리뷰: <StudyReview study={study} /> },
        ]),
  ]

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
                border: 'solid 1px rgb(208, 208, 208)',
                borderColor: '',
                borderRadius: '5%',
                position: 'sticky',
                top: '70px',
                padding: '10px',
              }}
            >
              <p style={{ fontSize: '12px', textAlign: 'left' }}>
                모집 기간: {study.createdAt} - {study.recruitFinishedAt}
              </p>
              <Button
                type="primary"
                style={{ marginTop: '30px', width: '100%' }}
              >
                스터디 참가 신청
              </Button>
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
                    style={{ cursor: 'pointer' }}
                  >
                    <Tooltip title="북마크 취소">
                      <BookFilled /> {study.bookmarkCnt}
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
                    style={{ cursor: 'pointer' }}
                  >
                    <Tooltip title="북마크">
                      <BookOutlined /> {study.bookmarkCnt}
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
                    style={{ cursor: 'pointer' }}
                  >
                    <Tooltip title="좋아요 취소">
                      <HeartFilled /> {study.likeCnt}
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
                    style={{ cursor: 'pointer' }}
                  >
                    <Tooltip title="좋아요">
                      <HeartOutlined /> {study.likeCnt}
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
