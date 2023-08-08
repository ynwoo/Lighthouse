import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import SideComponent from '../components/Utils/SideComponent'
import StudyInfo from '../components/Study/StudyInfo'
// import StudyMember from '../components/Study/StudyMember'
import StudyQnA from '../components/Study/StudyQnA'
import StudyRecord from '../components/Study/StudyRecord'
import StudyReview from '../components/Study/StudyReview'
import JoinTempInfo from '../components/Study/join/JoinTempInfo'
import { studyAction } from '../store/study'
import NologinStudyInfo from '../components/Study/nojoin/NologinStudyInfo'

export default function TempDetailPage({ isLoggedIn }) {
  const dispatch = useDispatch()
  const study = useSelector(state => state.study.studyDetail)
  // const isLogined = true // Replace with actual login status

  useEffect(() => {
    console.log(window.location.pathname?.split('/')[2])
    dispatch(studyAction.studyDetail(window.location.pathname?.split('/')[2]))
  }, [])

  const tabMenu = {
    ...(isLoggedIn ? { TempInfo: <StudyInfo study={study} /> } : {}),
    ...(isLoggedIn ? { 가입했을때정보: <JoinTempInfo study={study} /> } : {}),
    ...(isLoggedIn ? {} : { 가입Xinfo: <NologinStudyInfo study={study} /> }),
    ...(isLoggedIn ? {} : { TempQnA: <StudyQnA study={study} /> }),
    ...(isLoggedIn ? {} : { 회원정보: <StudyRecord study={study} /> }),
    ...(isLoggedIn ? {} : { TempReview: <StudyReview study={study} /> }),
  }
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
          items={new Array(Object.keys(tabMenu).length)
            .fill(null)
            .map((_, i) => {
              return {
                label: Object.keys(tabMenu)[i],
                key: i,
                children: Object.values(tabMenu)[i],
              }
            })}
        />
      </div>
    </div>
  )
}
