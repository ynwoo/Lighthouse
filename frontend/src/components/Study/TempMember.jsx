import React from 'react'
import readerLogo from '../../static/crown.png'
// 템플릿 상세의 인원정보(멤버)

export default function TempMember({ study }) {
  return (
    <div className="comp">
      {/* 만약 팀장이면 띄우기 */}
      <div className="t_mem_text">
        <img
          src={readerLogo}
          alt="엑박"
          style={{
            width: '40px',
            height: '40px',
            marginTop: '10px',
            marginRight: '5px',
          }}
        />
        <h2>닉네임</h2>
      </div>
      <div className="container">
        <div className="item1">
          <div className="temp_mini">
            <p>스터디 이름</p>
          </div>
        </div>
        <div className="item">
          <div className="temp_detail2">
            <p>{study.title}</p>
          </div>
        </div>
        <div className="item">
          <div className="temp_mini">
            <p>팀장</p>
          </div>
        </div>
        <div className="item">
          <div className="temp_detail2">
            <p>{study.leader_id}</p>
          </div>
        </div>
        <div className="item">
          <div className="temp_mini">
            <p>스터디 소개</p>
          </div>
        </div>
        <div className="item">
          <div className="temp_detail2">
            <p>{study.description}</p>
          </div>
        </div>
        <div className="item">
          <div className="temp_mini">
            <p>총원</p>
          </div>
        </div>
        <div className="item">
          <div className="temp_detail2">
            <p>
              {study.min_member} / {study.max_member}
            </p>
          </div>
        </div>
        <div className="item">
          <div className="temp_mini">
            <p>모집기간</p>
          </div>
        </div>
        <div className="item">
          <div className="temp_detail2">
            <p>{study.recruit_finished_at} 까지</p>
          </div>
        </div>
        <div className="item1">
          <div className="temp_mini">
            <p>시작 ~ 종료 기간</p>
          </div>
        </div>
        <div className="item1">
          {/* <div className="temp_detail3_1"> */}
          <div className="temp_detail3">
            <p>{study.started_at}</p>
          </div>
          <div className="temp_detail3">
            <p>{study.ended_at}</p>
            {/* </div> */}
          </div>
        </div>
        <div className="item" />
        <div className="item2">
          {/* <div className="temp_detail4_1"> */}
          {/* 조회수 */}
          <div className="temp_detail4">
            <p>조회수</p>
            <p>{study.hit}</p>
          </div>
          {/* 북마크 */}
          <div className="temp_detail4">
            <p>북마크</p>
            <p>{study.bookmark_cnt}</p>
          </div>
          {/* 좋아요 */}
          <div className="temp_detail4">
            <p>좋아요</p>
            <p>{study.like_cnt}</p>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}
