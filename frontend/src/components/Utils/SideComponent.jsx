import React, { useState } from 'react'
import { Button, Modal, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import UserProfileSide from '../User/UserProfileSide'
import profilePic from '../../logo.svg'

// const { Sider } = Layout

// 사이드
// const siderStyle = {
//   textAlign: 'center',
//   lineHeight: '100%',
//   color: 'black',
//   backgroundColor: 'transparent',
//   margin: '10px',
//   top: '50%',
//   left: '2.5%',
//   position: 'fixed',
// }

export default function SideComponent() {
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
  const Pic = profilePic
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  if (!isLoggedIn) {
    return (
      <div className="sidebar">
        {/* <Sider style={siderStyle}> */}
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
        </div>
        {/* </Sider> */}
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
