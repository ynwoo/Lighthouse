import { Button } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { studyAction } from '../../store/study'

// 템플릿 상세의 인원정보(멤버)

export default function StudyReview({ study }) {
  const dispatch = useDispatch()
  const [score, setScore] = useState(0)
  const [comment, setComment] = useState('')
  return (
    <div className="big_box">
      <div>
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <input
          type="number"
          value={score}
          onChange={e => setScore(e.target.value)}
        />
        <Button
          type="button"
          style={{ backgroundColor: 'skyblue' }}
          onClick={() => {
            const data = {
              studyId: study.id,
              comment,
              score: Number(score),
            }
            dispatch(studyAction.addEval(data))
              .unwrap()
              .then(() => {
                alert('리뷰 등록이 완료되었습니다!')
                dispatch(studyAction.studyDetail(study.id))
              })
              .catch(res => {
                if (res.response.status === 404) {
                  alert('리뷰는 한 개만 작성 가능합니다!')
                }
              })
          }}
        >
          리뷰 등록
        </Button>
      </div>
      <div className="review_box">
        <div>
          사용한 스터디 목록
          <div className="review_mini">응애</div>
        </div>

        <div>
          사용자들
          {study.studyEvals?.length !== 0 ? (
            study.studyEvals?.map(review => (
              <div className="review_mini">
                {review.userId} : {review.comment} - {review.score}
              </div>
            ))
          ) : (
            <div className="review_mini">아직 리뷰가 없어요...</div>
          )}
        </div>
      </div>
    </div>
  )
}
