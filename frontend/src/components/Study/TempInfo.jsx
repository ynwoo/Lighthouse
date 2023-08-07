import React, { useState } from 'react'
import photo from '../../static/aris.png'
import TempCurri from './TempCurri'
// import TempList from './TempList'
import MemoInput from './memo/MemoInput'
import MemoList from './memo/MemoList'
import DatePicker from './DatePicker'
import Calendar from './Calendar'

export default function TempInfo({ study }) {
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
    <div className="big_box">
      <div className="study_container">
        <img src={photo} alt="아리스" style={{ width: '100%' }} />
        <div className="study_box">
          <h1>
            {study.title}( {study.currentMember} / {study.maxMember} )
          </h1>
          <h3>
            스터디장 :{' '}
            {study.leaderProfile ? study.leaderProfile.nickname : `로딩중`}
          </h3>
          <h3>{study.description}</h3>
          {/* <p>모집기간 : {study.recruit_finished_at}</p> */}
          <h3>해시태그</h3>
          <div style={{ display: 'flex' }}>
            {study.studyTags ? (
              study.studyTags.map(tag => <p key={tag.id}>#{tag.tag.keyword}</p>)
            ) : (
              <p>loading...</p>
            )}
          </div>
          <hr />
          <p>조회수 - {study.hit}</p>
          <div>모집 마감 - {study.recruitFinishedAt} 까지</div>
          <div>시작 - {study.startedAt}</div>
          <div>끝 - {study.endedAt}</div>
          <p>북마크 - {study.bookmarkCnt}</p>
          <div>Tabom - {study.likeCnt}</div>
          <p>규칙 - {study.rule}</p>
          <p>배지 - {study.badge}</p>
          <p>tags - {study.studyTags}</p>
          <p>
            {' '}
            {study.isOnline
              ? '온라인'
              : `장소 - ${study.sido}, ${study.gugun}`}{' '}
          </p>
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
      <div className="info_text">
        <ul>
          <p>월간 계획</p>
        </ul>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Calendar />
      </div>
    </div>
  )
}
