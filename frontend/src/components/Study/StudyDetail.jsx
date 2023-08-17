// import React from 'react'
// import TempInfo from './StudyInfo'
// // import TempMember from './TempMember'
// // import TempQnA from './TempQnA'
// // import TempRecord from './TempRecord'
// // import TempReview from './TempReview'

// // 템플릿 상세

// export default function TempDetail({ study }) {
//   console.log(study)
//   // 상위 컴포넌트에서 stat을 props로 받아오는데
//   // 그것에 따라서 보여주는 컨텐츠가 다름
//   return (
//     <div>
//       <p>- {study.is_online ? '온라인' : '오프라인'}</p>
//       <p>작성시간: {study.created_at}</p>
//       <p>북마크: {study.bookmark_cnt}</p>
//       <p>{study.rule}</p>
//       <p>조회수: {study.hit}</p>
//       <p>좋아요: {study.like_cnt}</p>
//       <TempInfo study={study} />
//       {/* <h3>TempDetail - End</h3>
//       <div className="flex">
//         <TempMember />
//         <TempQnA />
//         <TempRecord />
//         <TempReview />
//       </div> */}
//     </div>
//   )
// }
