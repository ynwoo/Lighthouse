import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { studyAction } from '../../store/study'
import { userAction } from '../../store/user'

// 템플릿 상세의 인원정보(멤버)

export default function StudyReview({ study }) {
  const dispatch = useDispatch()
  const [score, setScore] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewers, setReviewers] = useState([])

  useEffect(() => {
    study.studyEvals?.forEach(review => {
      dispatch(userAction.profile(review.userId))
        .unwrap()
        .then(res => {
          setReviewers(a => [...a, res])
        })
    })
  }, [study])
  return (
    <div>
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
        <div>사용한 스터디 목록</div>

        <div>
          사용자 목록
          {study.studyEvals?.length !== 0 ? (
            study.studyEvals?.map(review => (
              <div className="review_mini">
                <Link
                  to={`/user_edit/${review.userId}`}
                  state={{ userId: review.userId }}
                >
                  {reviewers?.length === 0
                    ? '사용자 없음'
                    : reviewers?.find(user => user.id === review.userId)
                        ?.nickname}
                </Link>{' '}
                : {review.comment} - {review.score}점
              </div>
            ))
          ) : (
            <div>사용자가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  )
}
