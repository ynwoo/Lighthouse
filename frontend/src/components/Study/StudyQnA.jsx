import React, { useEffect, useState } from 'react'
import { Button, Input, List, Space, Divider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { studyAction } from '../../store/study'
import { userAction } from '../../store/user'

function QnA({ study }) {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const [answer, setAnswer] = useState('')
  const myInfo = useSelector(state => state.user.myProfile)
  const [askers, setAskers] = useState([])

  useEffect(() => {
    study.qnas.forEach(qna => {
      dispatch(userAction.profile(qna.userId))
        .unwrap()
        .then(res => {
          setAskers(a => [...a, res])
        })
    })
  }, [study])

  return (
    <div style={{ minHeight: '600px' }}>
      <h3 style={{ marginBottom: '10px' }}>질문하기</h3>
      <Space direction="horizontal">
        <Input
          value={text}
          defaultValue="질문을 입력하세요."
          onChange={e => {
            setText(e.target.value)
          }}
          style={{ width: '30vw' }}
        />
        <Button
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
          질문 등록
        </Button>
      </Space>
      <Divider />
      <List
        itemLayout="horizontal"
        dataSource={study.qnas}
        renderItem={qna => (
          <List.Item>
            <List.Item.Meta
              title={qna.question}
              description={
                <div>
                  {qna.answer != null ? (
                    qna.answer
                  ) : study.leaderProfile.id === myInfo.id ? (
                    <Space direction="horizontal">
                      <Input
                        value={answer}
                        onChange={e => {
                          setAnswer(e.target.value)
                        }}
                        style={{ width: '30vw' }}
                      />
                      <Button
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
                    </Space>
                  ) : (
                    '답변을 기다리고 있는 질문입니다.'
                  )}

                  <br />
                  <br />
                  <p style={{ fontSize: '12px' }}>
                    {qna.createdAt} 작성자:
                    <Link
                      to={`/user_edit/${qna.userId}`}
                      state={{ userId: qna.userId }}
                    >
                      {askers?.length === 0
                        ? '누구게'
                        : askers?.find(user => user.id === qna.userId)
                            ?.nickname}
                    </Link>
                  </p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default QnA
