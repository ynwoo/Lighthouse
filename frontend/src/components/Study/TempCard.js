import React from 'react'
import { Link } from 'react-router-dom'

// 템플릿 카드

function TempCard({ study }) {
  console.log(study)
  return (
    // Temp Detail로 보내주는 링크
    // 그냥 컴포넌트 자체가 하나의 링크라고 보면 됨
    <Link to="/temp/{study.id}">
      <div
        className="comp"
        style={{
          width: '300px',
          height: '500px',
        }}
      >
        <p>{study.title}</p>
        <p>{study.created_at}</p>
        <p>{study.recruit_finished_at}</p>
        <p>
          {study.current_member}/{study.max_member}
        </p>
        <p>{study.is_online ? '온라인' : '오프라인'}</p>
        <p>{study.like_cnt}개의 따봉</p>
      </div>
    </Link>
  )
}

export default TempCard
