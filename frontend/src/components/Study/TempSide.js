import React from 'react'
import TempCard from './TempCard'

export default function TempSide() {
  return (
    <div
      className="comp"
      style={{
        width: '300px',
        height: '800px',
      }}
    >
      <h3>TempSide</h3>
      <div
        className="flex"
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TempCard />
        <TempCard />
        <TempCard />
      </div>
    </div>
  )
}
