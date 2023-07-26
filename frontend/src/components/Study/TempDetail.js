import React from 'react'
// import TempInfo from './TempInfo'
// import TempMember from './TempMember'
// import TempQnA from './TempQnA'
// import TempRecord from './TempRecord'
// import TempReview from './TempReview'

// 템플릿 상세

export default function TempDetail({ study }) {
  console.log(study)
  // 상위 컴포넌트에서 stat을 props로 받아오는데
  // 그것에 따라서 보여주는 컨텐츠가 다름
  return (
    <div>
      <p>
        {study.title} - {study.is_online ? '온라인' : '오프라인'}
      </p>
      <p>(작성자: {study.leader_id})</p>
      <p>작성시간: {study.created_at}</p>
      <p>{study.recruit_finished_at} 까지 모집</p>
      <p>예상 시작일: {study.started_at}</p>
      <p>
        인원: {study.min_member} / {study.max_member}
      </p>
      <p>{study.description}</p>
      <p>{study.rule}</p>
      <p>조회수: {study.hit}</p>
      <p>좋아요: {study.like_cnt}</p>
      {/* <h3>TempDetail - End</h3>
      <div className="flex">
        <TempInfo />
        <TempMember />
        <TempQnA />
        <TempRecord />
        <TempReview />
      </div> */}
    </div>
  )
}
