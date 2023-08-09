import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import SideComponent from '../components/Utils/SideComponent'
import StudyInfo from '../components/Study/StudyInfo'
import StudyQnA from '../components/Study/StudyQnA'
import StudyRecord from '../components/Study/StudyRecord'
import StudyReview from '../components/Study/StudyReview'
import { studyAction } from '../store/study'
import NologinStudyInfo from '../components/Study/nojoin/NologinStudyInfo'
import JoinStudyInfo from '../components/Study/join/JoinStudyInfo'

export default function TempDetailPage({ isLoggedIn }) {
  const dispatch = useDispatch()
  const study = useSelector(state => state.study.studyDetail)

  useEffect(() => {
    console.log(window.location.pathname?.split('/')[2])
    dispatch(studyAction.studyDetail(window.location.pathname?.split('/')[2]))
  }, [])
  const userId = sessionStorage.getItem('userId')

  // 해당 스터디 가입한 사람과 그렇지 않은 사람 구분
  const tabMenu = study.memberProfiles?.find(
    memberProfile => memberProfile.id === Number(userId),
  )?.id
    ? [
        { TempInfo: <StudyInfo study={study} /> },
        { 가입했을때정보: <JoinStudyInfo study={study} /> },
      ]
    : [
        { 가입Xinfo: <NologinStudyInfo study={study} /> },
        { TempQnA: <StudyQnA study={study} /> },
        { 회원정보: <StudyRecord members={study?.memberProfiles} /> },
        { TempReview: <StudyReview study={study} /> },
      ]

  return (
    <div className="info_container">
      <div className="info_item" style={{ flex: '2' }}>
        <SideComponent study={study} isLoggedIn={isLoggedIn} />
      </div>

      {/* Tabs */}
      <div
        className="info_item1"
        style={{
          flex: '8',
        }}
      >
        <Tabs
          style={{
            width: '800px',
          }}
          type="card"
          items={tabMenu.map((menu, index) => {
            return {
              label: Object.keys(menu),
              key: index,
              children: Object.values(menu),
            }
          })}
        />
      </div>
    </div>
  )
}
