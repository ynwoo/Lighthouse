import React from 'react'
import TempDetail from '../components/Study/TempDetail'
import TempSide from '../components/Study/TempSide'

export default function TempDetailPage() {
  const stat = 1
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundImage: 'linear-gradient(to bottom, #74A3FF, #FFFFFF 25%)',
        marginTop: '-4px',
      }}
    >
      <TempSide />

      {/* stat에 따라 다르게 랜더링 해주는 컴포넌트 */}
      <TempDetail stat={stat} />
    </div>
  )
}
