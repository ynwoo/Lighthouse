import React from 'react'
import { useSelector } from 'react-redux'
import TempCard from '../Study/TempCard'
import dummy from '../../db/data.json'

function MainComponent() {
  const text = useSelector(state => state.study.value)
  const filterdData = dummy.study_list.filter(item => item.title.includes(text))

  return (
    <div
      style={{
        border: '1px solid',
        display: 'flex',
        margin: '10px',
        marginLeft: '250px',
      }}
    >
      <div
        style={{
          margin: '10px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* 렌더링 이전에 배열 메서드(filter)를 통해 필터링을 하고 보여준다. */}
        {filterdData.map(study => (
          <TempCard study={study} key={study.id} />
        ))}
      </div>
    </div>
  )
}

export default MainComponent
