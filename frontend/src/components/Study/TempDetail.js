import React from 'react'
import TempInfo from './TempInfo'
import TempMember from './TempMember'
import TempQnA from './TempQnA'
import TempRecord from './TempRecord'
import TempReview from './TempReview'

export default function TempDetail(props) {
  if (props.stat === 0) {
    return (
      <div
        className="comp"
        style={{
          width: '800px',
          height: '800px',
        }}
      >
        <h3>TempDetail - before{props.stat}</h3>
        <TempInfo />
        <TempMember />
        <TempQnA />
      </div>
    )
  } else if (props.stat === 1) {
    return (
      <div
        className="comp"
        style={{
          width: '800px',
          height: '800px',
        }}
      >
        <h3>TempDetail - ing{props.stat}</h3>
        <TempInfo />
        <TempMember />
        <TempQnA />
        <TempRecord />
      </div>
    )
  } else {
    return (
      <div
        className="comp"
        style={{
          width: '800px',
          height: '800px',
        }}
      >
        <h3>TempDetail - End{props.stat}</h3>
        <TempInfo />
        <TempMember />
        <TempQnA />
        <TempRecord />
        <TempReview />
      </div>
    )
  }
}
