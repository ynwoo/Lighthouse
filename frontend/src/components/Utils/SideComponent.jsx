import React, { useState } from 'react'
import { Button, Modal, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import profilePic from '../../logo.svg'

export default function SideComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false)
  const [message, setMessage] = useState('')

  const showModal = () => {
    setIsModalVisible(true)
    // Body 스크롤 방지
    document.body.style.overflow = 'hidden'
  }

  const handleOk = () => {
    console.log('Message:', message)
    setIsModalVisible(false)
    setIsConfirmationVisible(true)
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

  const handleChangeMessage = e => {
    setMessage(e.target.value)
  }

  const Pic = profilePic
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  if (!isLoggedIn) {
    return (
      <div className="sidebar">
        <div>
          <div className="circular-image2">
            <img src={Pic} alt="안뜸" />
          </div>
        </div>

        <div>
          <div>
            <Button
              type="primary"
              style={{
                backgroundColor: '#FFF1A9',
                color: 'black',
                border: '1px solid #FFF1A9',
                borderRadius: '20px',
                padding: '8px',
                fontWeight: 'bold',
                width: '200px',
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
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
              <p>스터디장에게 하고 싶은 말을 남겨주세요!</p>
              <Input
                placeholder="스터디장에게 하고 싶은 말을 작성해주세요."
                value={message}
                onChange={handleChangeMessage}
              />
            </Modal>

            <Modal
              title="신청이 완료되었습니다."
              visible={isConfirmationVisible}
              onOk={handleConfirmationOk}
              onCancel={handleConfirmationOk}
            >
              <p>스터디 신청이 성공적으로 완료되었습니다.</p>
              <p>Thank you for submitting your message!</p>
            </Modal>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type="primary"
            style={{
              backgroundColor: '#FFDFEB',
              color: 'black',
              border: '1px solid #FFDFEB',
              borderRadius: '20px',
              padding: '8px',
              fontWeight: 'bold',
              width: '95px',
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            좋아요
          </Button>
          <Button
            type="primary"
            style={{
              backgroundColor: '#DFEEFF',
              color: 'black',
              border: '1px solid #DFEEFF',
              borderRadius: '20px',
              padding: '8px',
              fontWeight: 'bold',
              width: '95px',
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            북마크
          </Button>
        </div>
      </div>
    )
  }
  return (
    // <Sider style={siderStyle}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'Column',
        alignItems: 'center',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: 'white',
      }}
    >
      <Link to="/login">
        <Button type="primary" style={{ width: '150px', margin: '10px' }}>
          LOGIN
        </Button>
      </Link>
      <Link to="/signup">
        <Button
          type="primary"
          style={{ width: '150px', margin: '10px' }}
          danger
        >
          SIGNUP
        </Button>
      </Link>

      <div
        style={{
          border: '1px solid',
          borderRadius: '10px',
          width: '80%',
          margin: '10px',
        }}
      >
        <h4>베스트 스터디</h4>
        <p>1. </p>
        <p>2. </p>
        <p>3. </p>
      </div>
      <div
        style={{
          border: '1px solid',
          borderRadius: '10px',
          width: '80%',
          margin: '10px',
        }}
      >
        <h4>베스트 템플릿</h4>
        <p>1. </p>
        <p>2. </p>
        <p>3. </p>
      </div>
    </div>
    // </Sider>
  )
}
