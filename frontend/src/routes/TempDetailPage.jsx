import React from 'react'
import { Tabs } from 'antd'
import SideComponent from '../components/Utils/SideComponent'
import StudyInfo from '../components/Study/StudyInfo'
import StudyMember from '../components/Study/StudyMember'
import StudyQnA from '../components/Study/StudyQnA'
import StudyRecord from '../components/Study/StudyRecord'
import StudyReview from '../components/Study/StudyReview'
import dummy from '../db/data.json'
import JoinTempInfo from '../components/Study/join/JoinTempInfo'

export default function TempDetailPage() {
  const study = dummy.study_detail[window.location.pathname.split('/')[2] - 1]
  const tabMenu = {
    TempInfo: <StudyInfo study={study} />,
    건들면X: <StudyMember study={study} />,
    TempQnA: <StudyQnA study={study} />,
    회원정보: <StudyRecord study={study} />,
    TempReview: <StudyReview study={study} />,
    가입했을때정보: <JoinTempInfo study={study} />,
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
