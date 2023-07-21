import React from 'react'
import SearchComponent from './SearchComponent'
import TempCard from '../Study/TempCard'

export default function MainComponent() {
  const i = 3
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

      <div>
        <button type="submit">갖가지</button>
        <button type="submit">카테고리를</button>
        <button type="submit">지닌</button>
        <button type="submit">버튼들</button>
        <button type="submit">물론</button>
        <button type="submit">기능은</button>
        <button type="submit">없어요</button>
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
          {Array(3).fill(<TempCard key={i} />)}
        </div>
        <div
          className="flex"
          style={{
            margin: '25px 0',
          }}
        >
          {Array([3, 4, 5]).fill(<TempCard key={i} />)}
        </div>
      </div>
    </div>
  )
}
