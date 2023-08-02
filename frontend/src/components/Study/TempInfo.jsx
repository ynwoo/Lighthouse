import React, { useState } from 'react'
import { Button, Modal, Input } from 'antd'
// import readerLogo from '../../static/crown.png'
// 템플릿 상세의 인원정보(멤버)

export default function TempMember({ study }) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false)
  const [message, setMessage] = useState('')

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    // Handle the submission of the message (you can send it to the server or perform any action)
    console.log('Message:', message)
    setIsModalVisible(false)
    setIsConfirmationVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleConfirmationOk = () => {
    setIsConfirmationVisible(false)
  }

  const handleChangeMessage = e => {
    setMessage(e.target.value)
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        textAlign: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        padding: '20px',
        margin: '-18px',
      }}
    >
      {/* 만약 팀장이면 띄우기 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          margin: '20px',
        }}
      >
        <Button
          type="primary"
          style={{
            backgroundColor: '#FFF1A9',
            color: 'black',
            border: '1px solid #FFF1A9',
            borderRadius: '20px',
            padding: '8px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '200px',
          }}
          onClick={showModal}
        >
          JOIN
        </Button>

        <Modal
          title="스터디 신청"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {/* 신청 창에 들어갈 내용 */}
          <p>스터디장에게 하고 싶은 말을 남겨주세요!</p>
          <Input
            placeholder="스터디장에게 하고 싶은 말을 작성해주세요."
            value={message}
            onChange={handleChangeMessage}
          />
        </Modal>
        {/* Confirmation Modal */}
        <Modal
          title="신청이 완료되었습니다."
          visible={isConfirmationVisible}
          onOk={handleConfirmationOk}
          onCancel={handleConfirmationOk} // Set onCancel to handle the "X" button click
        >
          {/* Confirmation message */}
          <p>스터디 신청이 성공적으로 완료되었습니다.</p>
          <p>Thank you for submitting your message!</p>
        </Modal>
      </div>
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          marginLeft: '60px',
          marginBottom: '60px',
        }}
      >
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
    </div>
  )
}
