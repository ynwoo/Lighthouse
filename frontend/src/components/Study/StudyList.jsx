import React from 'react'
import StudyCard from './StudyCard'

function MainComponent({ studies }) {
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
            {studies
              ? studies.map(study => <StudyCard study={study} key={study.id} />)
              : 'loading...'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainComponent
