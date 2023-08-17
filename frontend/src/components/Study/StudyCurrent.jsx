import React, { useState } from 'react'
import { Button, Card, Input, Modal } from 'antd'
import { useDispatch } from 'react-redux'
import { studyAction } from '../../store/study'
// 현재 진행 중인 스터디의 상세 페이지
export default function StudyCurrent({ study }) {
  console.log('studyInfo : ', study)
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false)
  const [notice, setNotice] = useState('')

  const showModal = () => {
    setIsModalVisible(true)
    // Body 스크롤 방지
    document.body.style.overflow = 'hidden'
  }

  const handleOk = () => {
    const data = {
      studyId: study.id,
      content: notice,
    }
    dispatch(studyAction.addNotice(data)).then(res => {
      if (res.type !== 'study/joinStudy/rejected') {
        setNotice('')
        dispatch(studyAction.studyDetail(study.id))
        setIsModalVisible(false)
        setIsConfirmationVisible(true)
      }
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    // Body 스크롤 재개
    document.body.style.overflow = 'auto'
  }

  const handleConfirmationOk = () => {
    setIsConfirmationVisible(false)
    // Body 스크롤 재개
    document.body.style.overflow = 'auto'
  }

  const handleChangeNotice = e => {
    setNotice(e.target.value)
  }

  return (
    <div>
      <div
        style={{
          height: '1000px',
          width: '100%',
          backgroundColor: 'rgb(255, 255, 255)',
        }}
      >
        {study.leaderProfile?.id === sessionStorage.getItem('userId') ? (
          <div>
            <Button type="primary" onClick={showModal}>
              새 공지 등록
            </Button>
            <Modal
              title="공지 작성"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>공지를 작성해주세요!</p>
              <Input
                placeholder="공지를 작성해주세요."
                value={notice}
                onChange={handleChangeNotice}
              />
            </Modal>

            <Modal
              title="공지 등록이 완료되었습니다."
              visible={isConfirmationVisible}
              onOk={handleConfirmationOk}
              onCancel={handleConfirmationOk}
            >
              <p>공지 등록이 성공적으로 완료되었습니다.</p>
            </Modal>
          </div>
        ) : (
          <n />
        )}
        <Card
          title="📢 스터디 공지"
          bordered={false}
          style={{ boxShadow: 'none' }}
        >
          <div style={{ display: 'flex', flexGrow: 1 }}>
            <p>
              {
                study.studyNotices?.reduce(
                  (res, now) =>
                    new Date(res.createdAt).getTime() >
                    new Date(now.createdAt).getTime()
                      ? res
                      : now,
                  0,
                ).content
              }
            </p>
          </div>
        </Card>

        {/* <Input
          type="text"
          value={notice}
          onChange={e => {
            setNotice(e.target.value)
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            const noticeId = study.studyNotices?.reduce(
              (res, now) =>
                new Date(res.createdAt).getTime() >
                new Date(now.createdAt).getTime()
                  ? res
                  : now,
              0,
            ).id
            const data = {
              noticeId,
              studyId: study.id,
              content: notice,
            }
            dispatch(studyAction.updateNotice(data)).then(() =>
              dispatch(studyAction.studyDetail(study.id)),
            )
            setNotice('')
          }}
        >
          공지 수정
        </Button> */}
        <Card
          title="📑 현재 진행 중인 커리큘럼"
          bordered={false}
          style={{ boxShadow: 'none' }}
        >
          <div>
            {study.sessions
              ?.filter(session => {
                return (
                  new Date(session.startedAt).getTime() <
                    new Date().getTime() &&
                  new Date(session.endedAt).getTime() > new Date().getTime()
                )
              })
              .map(session => (
                <>
                  <h3>{session.title}</h3>
                  <ul>
                    <li>{session.description}</li>
                  </ul>
                </>
              ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
