import React from 'react'
import { useSelector } from 'react-redux'
import TempCard from '../Study/TempCard'
import dummy from '../../db/data.json'

function MainComponent() {
  const text = useSelector(state => state.study.value)
  const filterdData = dummy.study_list.filter(item => item.title.includes(text))

  return (
    <div>
      <div style={{ width: '1000px' }}>
        <div
          style={{
            margin: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '1100px',
          }}
        >
          <div className="big_box_card">
            {filterdData.map(study => (
              <TempCard study={study} key={study.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainComponent
