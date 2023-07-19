import React from 'react'
import SideComponent from '../components/Utils/SideComponent'
import TempDetail from '../components/Study/TempDetail'

export default function TempDetailPage() {
  let stat = 1
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
      <TempDetail stat={stat} />
    </div>
  )
}
