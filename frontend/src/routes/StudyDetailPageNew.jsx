import React, { useEffect } from 'react'
import { Row, Col, Tag, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
// import SideComponent from '../components/Utils/SideComponent'
import StudyInfo from '../components/Study/StudyInfoNew'
import StudyQnA from '../components/Study/StudyQnA'
import StudyReview from '../components/Study/StudyReview'
import JoinStudyInfo from '../components/Study/join/JoinStudyInfo'
import StudyMember from '../components/Study/StudyMember'
import { studyAction } from '../store/study'
import { coverImage } from '../utils/image'
import UserName from '../components/Study/UserName'

export default function TempDetailPage({ isLoggedIn }) {
  const dispatch = useDispatch()
  const studyId = window.location.pathname?.split('/')[2]
  const study = useSelector(state => state.study.studyDetail)

  console.log(study)

  useEffect(() => {
    dispatch(studyAction.studyDetail(studyId))
  }, [])
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
    <div>
      <div
        style={{
          backgroundColor: 'rgb(194, 220, 255)',
          height: '300px',
          padding: '40px',
        }}
      >
        <Row style={{ height: '100%' }}>
          <Col xs={24} md={10} style={{ marginRight: '40px' }}>
            <img
              style={{
                width: '100%',
                height: '100%',
                marginLeft: '50%',
                transform: 'translateX(-50%)',
                objectFit: 'cover',
              }}
              src={coverImage(study.coverImgUrl)}
              alt="coverImage"
            />
          </Col>
          <Col style={{ padding: '50px 0 0 0' }}>
            <h1 style={{ height: '50px' }}>{study.title}</h1>
            <p style={{ fontSize: '18px', margin: '5px 0' }}>
              스터디장: <UserName user={study.leaderProfile} />{' '}
            </p>
            <p>
              현재 인원: {study.currentMemeber} 최대 인원: {study.maxMemeber}{' '}
              최소 인원: {study.minMemeber}
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
                      color: '#ace8ff',
                      borderColor: '#ace8ff',
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
        <Col span={6} style={{ paddingTop: '40px' }} align="middle">
          <div
            style={{
              width: '80%',
              height: '200px',
              backgroundColor: 'rgb(29, 46, 46)',
              position: 'sticky',
              top: '70px',
            }}
          >
            side bar
          </div>
        </Col>
      </Row>
    </div>
  )
}
