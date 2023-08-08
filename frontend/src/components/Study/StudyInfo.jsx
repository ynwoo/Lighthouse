import React, { useState } from 'react'
import photo from '../../static/aris.png'
import StudyCurriculum from './StudyCurriculum'
import MemoInput from './utils/memo/MemoInput'
import MemoList from './utils/memo/MemoList'
import DatePicker from './utils/DatePicker'
import {
  endDateToString,
  startDateToString,
} from '../../utils/FormateDateToString'
import { updateStudy } from '../../api/study'
import StringToDate from '../../utils/FormateStringToDate'

export default function StudyInfo({ study }) {
  const [memos, setMemos] = useState([])
  const [startDate, setStartDate] = useState(StringToDate(study.startedAt))
  const [endDate, setEndDate] = useState(StringToDate(study.endedAt))
  const [recruitFinishedDate, setRecruitFinishedDate] = useState(
    StringToDate(study.recruitFinishedAt),
  )
  const [createdDate, setCreatedDate] = useState(StringToDate(study.createdAt))

  const handleStartDateChange = date => {
    setStartDate(date)
  }

  const handleEndDateChange = date => {
    setEndDate(date)
  }
  const handleRecruitFinishedDateChange = date => {
    setRecruitFinishedDate(date)
  }
  const handleCreatedDateChange = date => {
    setCreatedDate(date)
  }
  const handleAddMemo = memo => {
    setMemos(prevMemos => [
      ...prevMemos,
      {
        id: Date.now(), // 랜덤 ID 대신 현재 시간을 ID로 사용
        text: memo,
      },
    ])
  }

  const handleUpdateStudy = () => {
    const studyRequest = {
      ...study,
      sessions: [...study.sessions],
      studyTags: [...study.studyTags],
      studyNotices: [...study.studyNotices],
      startedAt: startDateToString(startDate),
      endedAt: endDateToString(endDate),
      recruitFinishedAt: endDateToString(recruitFinishedDate),
      createdAt: startDateToString(createdDate),
    }
    const blob = new Blob([JSON.stringify(studyRequest)], {
      type: 'application/json',
    })
    const formData = new FormData()
    formData.append('studyRequest', blob)
    formData.append('studyId', study.id)
    console.log('blob', blob)
    updateStudy(
      formData,
      ({ data }) => {
        console.log(data)
      },
      ({ data }) => {
        console.log(data)
      },
    )
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
      <p>배지 - {study.badge ? study.badge.name : 'loading...'}</p>
      <p>tags - {study.studyTags}</p>
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
          <DatePicker
            changeStartDate={handleStartDateChange}
            changeEndDate={handleEndDateChange}
            initStartDate={study.startDate}
            initEndDate={study.endDate}
          />
        </div>
      </div>
      <div>
        <div className="info_text">
          <ul>
            <p>모집 기간</p>
          </ul>
        </div>
      </div>
      <DatePicker
        changeStartDate={handleCreatedDateChange}
        changeEndDate={handleRecruitFinishedDateChange}
        initStartDate={study.createdAt}
        initEndDate={study.recruitFinishedDate}
      />
      <button type="button" onClick={handleUpdateStudy}>
        수정
      </button>
    </div>
  )
}
