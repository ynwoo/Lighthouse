import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import photo from '../../static/aris.png'
import StudyCurriculum from './StudyCurriculum'
import MemoInput from './utils/memo/MemoInput'
import MemoList from './utils/memo/MemoList'
import DatePicker from './utils/DatePicker'

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
            <Link
              to={`/user/${study.leaderProfile.id}`}
              state={{ userId: study.leaderProfile.id }}
              className="dropdown_toggle"
            >
              {study.leaderProfile ? study.leaderProfile.nickname : `로딩중`}
            </Link>
          </h3>
          <h3>해시태그</h3>
          <div style={{ display: 'flex' }}>
            {study.studyTags?.map(tag => (
              <p key={tag.id}>#{tag.tag?.keyword}</p>
            ))}
          </div>
          <hr />
          <p>조회수 - {study.hit}</p>
        </div>
      </div>
      <div className="info_text">
        <ul>
          <p>스터디 정보</p>
        </ul>
      </div>
      <h3>{study.description}</h3>
      <div>모집 마감 - {study.recruitFinishedAt?.split(' ')[0]} 까지</div>
      <div>시작 - {study.startedAt?.split(' ')[0]}</div>
      <div>끝 - {study.endedAt?.split(' ')[0]}</div>
      <p>북마크 - {study.bookmarkCnt}</p>
      <div>Tabom - {study.likeCnt}</div>
      <p>규칙 - {study.rule}</p>
      <p>배지 - {study.badge?.name}</p>
      <p>
        {' '}
        {study.isOnline
          ? '온라인'
          : `장소 - ${study.sido}, ${study.gugun}`}{' '}
      </p>
      <div className="info_text">
        <ul>
          <p>커리큘럼</p>
        </ul>
      </div>
      <div style={{ textAlign: 'left', margin: '10px' }}>
        <StudyCurriculum />
      </div>
      <div>
        <div className="info_text">
          <ul>
            <p>모집대상</p>
          </ul>
        </div>
        <div>
          <MemoInput onAddMemo={handleAddMemo} />
          <MemoList memos={memos} onDeleteMemo={handleDeleteMemo} />
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
  )
}
