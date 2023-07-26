import React from 'react'
import SearchComponent from './SearchComponent'
import TempCard from '../Study/TempCard'
import dummy from '../../db/data.json'

export default function MainComponent() {
  const filterdData = dummy.data.filter(item => item.id > 6)
  return (
    <div
      className="comp"
      style={{
        width: '800px',
        height: '800px',
      }}
    >
      <SearchComponent />
      <h3>MainComponent</h3>

  return (
    <div style={{
      border: '1px solid', display: 'flex', margin: '10px',
    }}>
      <div style={{
        border: '1px solid', color: 'black',
        borderRadius: '10px', width: '200px', height: '200px',
        backgroundColor: 'white', margin: '10px'
      }}>
        응애
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
          {/* 실무 들어가면 배열 메서드 쓸 예정 */}
          {/* 결국 데이터는 부모에 있기 때문에 */}
          {/* 렌더링 이전에 배열 메서드(filter)를 통해 필터링을 하고 보여준다. */}
          {filterdData.map(study => (
            <TempCard study={study} key={study.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
