import React from 'react'
import { connect } from 'react-redux'
import TempCard from '../Study/TempCard'
import dummy from '../../db/data.json'

function MainComponent({ text }) {
  console.log(text)
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
// store에서 prop 받아오기
function mapStateToProps(state) {
  return { text: state.text }
}

// 매개변수에는 props와 dispatch가 들어간다.
export default connect(mapStateToProps)(MainComponent)
