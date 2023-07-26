import React from 'react'
import TempCard from '../Study/TempCard'
import dummy from '../../db/data.json'

export default function MainComponent() {
  const filterdData = dummy.data.filter(item => item.id > 6)

  return (
    <div
      style={{
        border: '1px solid',
        display: 'flex',
        margin: '10px',
      }}
    >
      {/* 템플릿 3회 반복문 */}
      {/* 실무 들어가면 배열 메서드 쓸 예정 */}
      {/* 결국 데이터는 부모에 있기 때문에 */}
      {/* 렌더링 이전에 배열 메서드(filter)를 통해 필터링을 하고 보여준다. */}
      {filterdData.map(study => (
        <TempCard study={study} key={study.id} />
      ))}
    </div>
  )
}
