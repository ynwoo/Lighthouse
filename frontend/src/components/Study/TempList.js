import React from 'react'
import TempCard from './TempCard'

export default function TempList() {
  return (
    <div
      className="comp"
      style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
      }}
    >
      <h3>TempList</h3>
      <div>
        <button>갖가지</button>
        <button>카테고리를</button>
        <button>지닌</button>
        <button>버튼들</button>
        <button>물론</button>
        <button>기능은</button>
        <button>없어요</button>
      </div>

      <hr />

      <div>
        <div
          className="flex"
          style={{
            margin: '25px 0',
          }}
        >
          {/* 템플릿 3회 반복문 */}
          {Array(3).fill(<TempCard />)}
        </div>
        <div
          className="flex"
          style={{
            margin: '25px 0',
          }}
        >
          {Array(3).fill(<TempCard />)}
        </div>
      </div>
    </div>
  )
}
