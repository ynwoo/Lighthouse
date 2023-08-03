import React from 'react'
// import { Link } from 'react-router-dom'

function TempReview() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        padding: '20px',
        margin: '-18px',
      }}
    >
      <details style={{ fontSize: '15px' }}>
        <summary>저의 점수는요</summary>
        <ul>
          <li>10점 만점에 10점</li>
        </ul>
      </details>
    </div>
  )
}

export default TempReview
