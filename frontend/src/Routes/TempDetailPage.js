import React from 'react'
import { Tabs } from 'antd'
// import TempDetail from '../components/Study/TempDetail'
import SideComponent from '../components/Utils/SideComponent'
import TempDetail from '../components/Study/TempDetail'

const onChange = key => {
  console.log(key)
}

export default function TempDetailPage() {
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
      <div>
        <SideComponent />
      </div>
      <div className="tabs-container">
        <Tabs
          onChange={onChange}
          type="card"
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1)
            return {
              label: `Tab ${id}`,
              key: id,
              children: <TempDetail stat={id} />,
            }
          })}
        />
      </div>
      {/* stat에 따라 다르게 랜더링 해주는 컴포넌트 */}
      {/* <TempDetail stat={stat} /> */}
    </div>
  )
}
