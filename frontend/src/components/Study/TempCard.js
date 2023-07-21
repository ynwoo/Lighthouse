import React from 'react'
import { Link } from 'react-router-dom'

// 템플릿 카드

export default function TempCard() {
  return (
    // Temp Detail로 보내주는 링크
    // 그냥 컴포넌트 자체가 하나의 링크라고 보면 됨
    <Link to="/temp/fromTempCard">
      <div
        className="comp"
        style={{
          width: '200px',
          height: '150px',
        }}
      >
        TempCard
      </div>
    </Link>
  )
}
