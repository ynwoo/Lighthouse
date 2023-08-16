import React, { useState } from 'react'
import { Button, Collapse } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { studyAction } from '../../store/study'

function QnA({ study }) {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [answer, setAnswer] = useState('')
  const myInfo = useSelector(state => state.user.myProfile)

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <div className="big_box">
        <input
          type="text"
          value={text}
          onChange={e => {
            setText(e.target.value)
          }}
        />
        <Button
          type="button"
          onClick={() => {
            const data = {
              userId: myInfo.id,
              studyId: study.id,
              question: text,
            }
            dispatch(studyAction.addQnA(data)).then(() =>
              dispatch(studyAction.studyDetail(study.id)),
            )
            setText('')
          }}
        >
          QnA 등록
        </Button>
        {study.qnas?.map(qna => (
          <Collapse
            size="large"
            items={[
              {
                key: '1',
                label: (
                  <p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {' '}
                      <h3 style={{ margin: '0px' }}>Q : {qna.question}</h3>
                      <p>작성 시간 : {qna.createdAt}</p>
                    </div>

                    <p style={{ textAlign: 'right' }}> 작성자 : {qna.userId}</p>
                  </p>
                ),
                children: (
                  <>
                    <h3 style={{ textAlign: 'left' }}>A : {qna.answer}</h3>
                    <input
                      type="text"
                      value={answer}
                      onChange={e => {
                        setAnswer(e.target.value)
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        const data = {
                          qnaId: qna.id,
                          userId: qna.userId,
                          studyId: study.id,
                          question: qna.question,
                          answer,
                        }
                        dispatch(studyAction.updateQnA(data)).then(() =>
                          dispatch(studyAction.studyDetail(study.id)),
                        )
                        setAnswer('')
                      }}
                    >
                      답변 등록
                    </Button>
                  </>
                ),
              },
            ]}
          />
          // <p>
          //   <p>
          //     <h3>Q : {qna.question}</h3>
          //     {qna.userId} : {qna.createdAt}
          //   </p>
          //   <p>A : {qna.answer}</p>
          //   <hr />
          // </p>
        ))}
      </div>
    </>
  )
}

export default QnA
