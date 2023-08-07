import React, { useState } from 'react'
import { Button, Modal, Input } from 'antd'
import { participateStudy } from '../../api/participation'
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
    participateStudy(
      study.id,
      () => {
        // alert('회원 등록 성공')
        setIsModalVisible(false)
        setIsConfirmationVisible(true)
      },
      ({ response }) => {
        alert(response.data)
      },
    )
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
  const API_URL = process.env.REACT_APP_API_URL
  const { REACT_APP_S3_DOMAIN_URL } = process.env
  console.log(
    'img src : ',
    `${process.env.S3_DOMAIN_URL}/${study.leaderProfile?.badges[0]?.imgUrl}.png`,
  )
  console.log('S3_DOMAIN_URL', REACT_APP_S3_DOMAIN_URL, API_URL)

  return (
    <div className="big_box">
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
              <p>
                {study.leaderProfile?.nickname}
                <img
                  src={`${process.env.REACT_APP_S3_DOMAIN_URL}/${study.leaderProfile?.badges[0]?.imgUrl}`}
                  alt={study.leaderProfile?.badges[0]?.name}
                  style={{ width: '10px', height: '10px' }}
                />
              </p>
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
                {study.currentMember} / {study.minMember} ~ {study.maxMember}
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
              <p>{study.recruitFinishedAt.split(' ')[0]} 까지</p>
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
              <p>{study.startedAt.split(' ')[0]}</p>
            </div>
            <div className="temp_detail3">
              <p>{study.endedAt.split(' ')[0]}</p>
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
              <p>{study.bookmarkCnt}</p>
            </div>
            {/* 좋아요 */}
            <div className="temp_detail4">
              <p>좋아요</p>
              <p>{study.likeCnt}</p>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
