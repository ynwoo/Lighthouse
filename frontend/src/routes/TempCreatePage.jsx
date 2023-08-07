import React, { useState } from 'react'
import SideComponent from '../components/Utils/SideComponent'
import photo from '../static/aris.png'
import TempCurri from '../components/Study/StudyCurriculum'
// import TempList from './TempList'
import MemoInput from '../components/Study/utils/memo/MemoInput'
import MemoList from '../components/Study/utils/memo/MemoList'
import DatePicker from '../components/Study/utils/DatePicker'
// import Calendar from '../components/Study/Calendar'

export default function TempCreate() {
  const [memos, setMemos] = useState([])

  const handleAddMemo = memo => {
    setMemos(prevMemos => [
      ...prevMemos,
      {
        id: Date.now(), // 랜덤 ID 대신 현재 시간을 ID로 사용
        text: memo,
      },
    ])
  }
  const handleDeleteMemo = memoId => {
    const updatedMemos = memos.filter(memo => memo.id !== memoId)
    setMemos(updatedMemos)
  }
  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(to bottom, #74a3ff, #ffffff 25%',
        marginTop: '-50px',
      }}
    >
      <div className="big_box2" style={{ left: '25%' }}>
        <div className="study_container">
          <img src={photo} alt="아리스" style={{ width: '100%' }} />
          <div className="study_box">
            <h3>스터디장</h3>
            <h3>해시태그</h3>
          </div>
        </div>
        <div className="info_text">
          <ul>
            <p>커리큘럼</p>
          </ul>
        </div>
        <div style={{ textAlign: 'left', margin: '10px' }}>
          <TempCurri />
        </div>
        <div>
          <div className="info_text">
            <ul>
              <p>모집대상</p>
            </ul>
          </div>
          <div>
            {/* Memo Input */}
            <MemoInput onAddMemo={handleAddMemo} />
            {/* Memo List */}
            {/* <MemoList memos={memos} /> */}
            <MemoList memos={memos} onDeleteMemo={handleDeleteMemo} />
            {/* ... (rest of the code) */}
          </div>
        </div>
        <div>
          <div className="info_text">
            <ul>
              <p>스터디 기간</p>
            </ul>
          </div>
          <div>
            <DatePicker />
          </div>
        </div>
        <div>
          <div className="info_text">
            <ul>
              <p>모집 기간</p>
            </ul>
          </div>
        </div>
        <DatePicker />
      </div>
      <div>
        <div>
          <SideComponent />
        </div>
      </div>
    </div>
  )
}
