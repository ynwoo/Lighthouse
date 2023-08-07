import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import SideComponent from '../components/Utils/SideComponent'
import TempInfo from '../components/Study/TempInfo'
import TempMember from '../components/Study/TempMember'
import TempQnA from '../components/Study/TempQnA'
import TempRecord from '../components/Study/TempRecord'
import TempReview from '../components/Study/TempReview'
import { studyAction } from '../store/study'

export default function TempDetailPage() {
  const dispatch = useDispatch()
  const study = useSelector(state => state.study.studyDetail)

  useEffect(() => {
    console.log(window.location.pathname.split('/')[2])
    dispatch(studyAction.studyDetail(window.location.pathname.split('/')[2]))
  }, [])

  console.log(study)
  const tabMenu = {
    TempInfo: <TempInfo study={study} />,
    TempMember: <TempMember study={study.memberProfiles} />,
    TempQnA: <TempQnA study={study.qnas} />,
    TempRecord: <TempRecord study={study} />,
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
