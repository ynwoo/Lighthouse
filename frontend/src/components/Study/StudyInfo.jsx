import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
import likemark from '../../static/mark/like.png'
import bookmark from '../../static/mark/bookmark-white.png'
import view from '../../static/mark/view.png'

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
            <Link
              to={`/user/${study.leaderProfile?.id}`}
              state={{ userId: study.leaderProfile?.id }}
              className="dropdown_toggle"
            >
              {study.leaderProfile ? study.leaderProfile.nickname : `로딩중`}
            </Link>
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            {study.studyTags ? (
              study.studyTags.map(tag => (
                <p key={tag.id}> #{tag.tag.keyword} &nbsp;</p>
              ))
            ) : (
              <p>loading...</p>
            )}
          </div>
          <br />
          <div className="mark_container">
            <div />
            <div />
            <div />
            <div>
              <img src={view} alt="" style={{ width: '20px' }} />
            </div>
            <div> {study.bookmarkCnt}</div>
            <div>
              <img src={bookmark} alt="" style={{ width: '20px' }} />
            </div>
            <div>{study.bookmarkCnt}</div>
            <div>
              <img src={likemark} alt="" style={{ width: '20px' }} />
            </div>
            <div> {study.likeCnt}</div>
          </div>
        </div>
      </div>
      <div className="info_text">
        <p>스터디 정보</p>
      </div>
      <p style={{ margin: '0 auto' }}>{study.description}</p>
      {study.rule?.split('\n')?.map((rulee, i) => (
        <p key={i}>{rulee}</p>
      ))}

      <p>{study.badge && `배지 - ${study.badge.name}`}</p>

      <p>
        {' '}
        {study.isOnline
          ? '온라인'
          : study.sido && study.gugun
          ? `장소 - ${study.sido}, ${study.gugun}`
          : ''}{' '}
      </p>
      <div className="info_text">
        <p>커리큘럼</p>
      </div>
      <div style={{ textAlign: 'left', margin: '10px' }}>
        <StudyCurriculum />
      </div>
      <div>
        <div className="info_text">
          <p>모집대상</p>
        </div>
        <div>
          <MemoInput onAddMemo={handleAddMemo} />
          <MemoList memos={memos} onDeleteMemo={handleDeleteMemo} />
        </div>
      </div>
      <div>
        <div className="info_text">
          <p>스터디 기간</p>
        </div>
        <div>
          <DatePicker
            changeStartDate={handleStartDateChange}
            changeEndDate={handleEndDateChange}
            initStartDate={study.startedAt}
            initEndDate={study.endedAt}
          />
        </div>
      </div>
      <div>
        <div className="info_text">
          <p>모집 기간</p>
        </div>
      </div>
      <DatePicker
        changeStartDate={handleCreatedDateChange}
        changeEndDate={handleRecruitFinishedDateChange}
        initStartDate={study.createdAt}
        initEndDate={study.recruitFinishedAt}
      />
      <button type="button" onClick={handleUpdateStudy}>
        수정
      </button>
    </div>
  )
}
