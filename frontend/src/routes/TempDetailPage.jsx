import React from 'react'
import { Tabs } from 'antd'
import SideComponent from '../components/Utils/SideComponent'
import TempInfo from '../components/Study/TempInfo'
import TempMember from '../components/Study/TempMember'
import TempQnA from '../components/Study/TempQnA'
import TempRecord from '../components/Study/TempRecord'
import TempReview from '../components/Study/TempReview'
import dummy from '../db/data.json'

export default function TempDetailPage() {
  const study = dummy.study_detail[window.location.pathname.split('/')[2] - 1]
  const tabMenu = {
    TempInfo: <TempInfo study={study} />,
    건들면X: <TempMember study={study} />,
    TempQnA: <TempQnA study={study} />,
    회원정보: <TempRecord study={study} />,
    TempReview: <TempReview study={study} />,
  }

  return (
    <div className="info_container">
      <div className="info_item" style={{ flex: '2' }}>
        <SideComponent />
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
