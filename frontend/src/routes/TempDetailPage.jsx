import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import SideComponent from '../components/Utils/SideComponent'
<<<<<<< HEAD
import StudyInfo from '../components/Study/StudyInfo'
import StudyMember from '../components/Study/StudyMember'
import StudyQnA from '../components/Study/StudyQnA'
import StudyRecord from '../components/Study/StudyRecord'
import StudyReview from '../components/Study/StudyReview'
import dummy from '../db/data.json'
import JoinTempInfo from '../components/Study/join/JoinTempInfo'
=======
import TempInfo from '../components/Study/TempInfo'
import TempMember from '../components/Study/TempMember'
import TempQnA from '../components/Study/TempQnA'
import TempRecord from '../components/Study/TempRecord'
import TempReview from '../components/Study/TempReview'
import { studyAction } from '../store/study'
>>>>>>> ff5fbb36691753512f8dfe94227406e2fcc14cfd

export default function TempDetailPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(window.location.pathname.split('/')[2])
    dispatch(studyAction.studyDetail(window.location.pathname.split('/')[2]))
  }, [])

  const study = useSelector(state => state.study.studyDetail)
  console.log(study)
  const tabMenu = {
<<<<<<< HEAD
    TempInfo: <StudyInfo study={study} />,
    건들면X: <StudyMember study={study} />,
    TempQnA: <StudyQnA study={study} />,
    회원정보: <StudyRecord study={study} />,
    TempReview: <StudyReview study={study} />,
    가입했을때정보: <JoinTempInfo study={study} />,
=======
    TempInfo: <TempInfo study={study} />,
    TempMember: <TempMember study={study.memberProfiles} />,
    TempQnA: <TempQnA study={study.qnas} />,
    TempRecord: <TempRecord study={study} />,
    TempReview: <TempReview study={study} />,
>>>>>>> ff5fbb36691753512f8dfe94227406e2fcc14cfd
  }

  return (
    <div className="info_container">
      <div className="info_item" style={{ flex: '2' }}>
        <SideComponent study={study} />
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
