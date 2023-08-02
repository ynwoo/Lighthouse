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
    TempMember: <TempMember study={study} />,
    TempQnA: <TempQnA study={study} />,
    TempRecord: <TempRecord study={study} />,
    TempReview: <TempReview study={study} />,
  }

  // const stat = 1
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundImage: 'linear-gradient(to bottom, #74A3FF, #FFFFFF 25%)',
        marginTop: '-4px',
      }}
    >
      <SideComponent />
      <div>
        <Tabs
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
