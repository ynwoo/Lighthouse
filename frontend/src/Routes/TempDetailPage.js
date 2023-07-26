import React from 'react'
import { Tabs } from 'antd'
import TempDetail from '../components/Study/TempDetail'
import SideComponent from '../components/Utils/SideComponent'
import dummy from '../db/data.json'

const onChange = key => {
  console.log(key)
}
export default function TempDetailPage() {
  const study = dummy.study_detail[window.location.pathname.split('/')[2] - 1]

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
          onChange={onChange}
          type="card"
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1)
            return {
              label: `Tab ${id}`,
              key: id,
              children: 'tempDetail',
            }
          })}
        />
        <TempDetail study={study} />
      </div>
    </div>
  )
}
