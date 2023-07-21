import React from 'react'
import TempInfo from './TempInfo'
import TempMember from './TempMember'
import TempQnA from './TempQnA'
import TempRecord from './TempRecord'
import TempReview from './TempReview'

// 템플릿 상세

export default function TempDetail({ stat }) {
  console.log(stat)
  // 상위 컴포넌트에서 stat을 props로 받아오는데
  // 그것에 따라서 보여주는 컨텐츠가 다름
  if (stat === 0) {
    return (
      <div
        className="comp"
        style={{
          width: '800px',
          height: '800px',
        }}
      >
        <h3>TempDetail - before</h3>
        <div className="flex">
          <TempInfo />
          <TempMember />
          <TempQnA />
        </div>
      </div>
    )
  }
  if (stat === 1) {
    return (
      <div
        className="comp"
        style={{
          width: '800px',
          height: '800px',
        }}
      >
        <h3>TempDetail - ing</h3>
        <div className="flex">
          <TempInfo />
          <TempMember />
          <TempQnA />
          <TempRecord />
        </div>
      </div>
    )
  }
  return (
    <div
      className="comp"
      style={{
        width: '800px',
        height: '800px',
      }}
    >
      <h3>TempDetail - End</h3>
      <div className="flex">
        <TempInfo />
        <TempMember />
        <TempQnA />
        <TempRecord />
        <TempReview />
      </div>
    </div>
  )
}
