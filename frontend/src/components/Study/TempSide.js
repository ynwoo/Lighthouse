import React from 'react'
import TempCard from './TempCard'
import dummy from '../../db/data.json'

// 템플릿 상세에서 사이드에 표시 될 템플릿
// 이거 세세하게 나눠서 참가 중일 경우 채팅방을 띄울 수 있도록
// 조건문으로 걸러 줄 예정

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
        <TempCard study={dummy.data[2]} />
        <TempCard study={dummy.data[3]} />
        <TempCard study={dummy.data[4]} />
      </div>
    </div>
  )
}
