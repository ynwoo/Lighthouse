import React from 'react'

// 템플릿 상세의 정보

export default function TempInfo({ study }) {
  return (
    <div className="temp_detail">
      <div className="temp_detail1">
        <div>
          <div className="temp_mini">
            <h2>스터디 이름</h2>
          </div>
          <div className="temp_mini">
            <h2>팀장</h2>
          </div>
          <div className="temp_mini">
            <h2>스터디 소개</h2>
          </div>
          <div className="temp_mini">
            <h2>총원</h2>
          </div>
          <div className="temp_mini">
            <h2>모집기간</h2>
          </div>
          <div className="temp_mini">
            <h2>시작 ~ 종료 기간</h2>
          </div>
        </div>
        <div>
          <div className="temp_detail2">
            <h2>{study.title}</h2>
          </div>
          <div className="temp_detail2">
            <h2>{study.leader_id}</h2>
          </div>

          <div className="temp_detail2">
            <h2>{study.description}</h2>
          </div>

          <div className="temp_detail2">
            <h2>
              {study.min_member} / {study.max_member}
            </h2>
          </div>

          <div className="temp_detail2">
            <h2>{study.recruit_finished_at} 까지</h2>
          </div>
          <div className="temp_detail3_1">
            <div className="temp_detail3">
              <h2>{study.started_at}</h2>
            </div>
            <div className="temp_detail3">
              <h2>{study.ended_at}</h2>
            </div>
          </div>

          <div className="temp_detail4_1">
            {/* 조회수 */}

            <div className="temp_detail4">
              <h2>조회수</h2>
              <h2>{study.hit}</h2>
            </div>
            {/* 북마크 */}
            <div className="temp_detail4">
              <h2>북마크</h2>
              <h2>{study.bookmark_cnt}</h2>
            </div>
            {/* 좋아요 */}
            <div className="temp_detail4">
              <h2>좋아요</h2>
              <h2>{study.like_cnt}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
