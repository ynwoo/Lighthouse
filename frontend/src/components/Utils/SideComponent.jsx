import React, { useState } from 'react'
import { Button, Modal, Input } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
import profilePic from '../../logo.svg'
import logo from '../../static/LOGO1.png'
import { studyAction } from '../../store/study'

const API_URL = process.env.REACT_APP_API_URL
export default function SideComponent({ isLoggedIn, study }) {
  const dispatch = useDispatch()
  // 스터디 신청 모달
  const [isModalVisible, setIsModalVisible] = useState(false)
  // 스터디 목록 모달
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false)

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false)
  const [message, setMessage] = useState('')
  const nickname = sessionStorage.getItem('nickname')
  // 스터디 가입
  const OnclickJoin = () => {
    axios.put(`${API_URL}/participation-history/${study.id}`)
    console.log('id', study.id)
  }

  const showModal = () => {
    setIsModalVisible(true)
    // Body 스크롤 방지
    document.body.style.overflow = 'hidden'
  }

  const handleOk = () => {
    console.log('Message:', message)
    console.log(study.id)
    dispatch(studyAction.joinStudy(study.id)).then(res => {
      console.log(res)
      if (res.type !== 'study/joinStudy/rejected') {
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

  const handleChangeMessage = e => {
    setMessage(e.target.value)
  }

  const Pic = profilePic
  const location = useLocation()
  // 현재 URL에 "/temp"가 포함되어 있는지 여부를 체크합니다.
  const isTempPath = location.pathname.includes('/temp')
  const nickname = sessionStorage.getItem('nickname')

  // 스터디 목록 모달
  const showConfirmationModal = () => {
    setIsConfirmationModalVisible(true)
    // 본문 스크롤 방지
    document.body.style.overflow = 'hidden'
  }

  const handleConfirmationModalOk = () => {
    setIsConfirmationModalVisible(false)
    // 본문 스크롤 복구
    document.body.style.overflow = 'auto'
  }

  const handleConfirmationModalCancel = () => {
    setIsConfirmationModalVisible(false)
    // 본문 스크롤 복구
    document.body.style.overflow = 'auto'
  }

  const profile = useSelector(state => state.user.profile)
  console.log(profile)
  if (isLoggedIn) {
    return (
      <div className={isTempPath ? 'sidebar1' : 'sidebar'}>
        <div>
          <div className="circular-image2">
            <img src={Pic} alt="안뜸" />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <p>{nickname}님 환영합니다 !</p>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Button
            type="primary"
            style={{
              backgroundColor: '#A4C3FF',
              color: 'black',
              border: '1px solid #A4C3FF',
              borderRadius: '20px',
              padding: '10px',
              fontWeight: 'bold',
              width: '200px',
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px',
              marginTop: '10px',
            }}
            onClick={showConfirmationModal}
          >
            가입한 스터디 바로가기
          </Button>

          <Modal
            title="가입한 스터디 목록"
            visible={isConfirmationModalVisible}
            onOk={handleConfirmationModalOk}
            onCancel={handleConfirmationModalCancel}
          >
            <p>왜안떠</p>
            <p>
              {profile.participatedStudies?.map(studyData => (
                // <Select.Option value={studyData.title} key={studyData.title}>
                <Link to={`/temp/${studyData.id}`} state={{ id: studyData.id }}>
                  {studyData.title}
                </Link>
                // </Select.Option>
              ))}{' '}
            </p>
          </Modal>

          <div>
            {isTempPath && (
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
            )}

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            {isTempPath && (
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
            )}
            {isTempPath && (
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
            )}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="sidebar2">
      <img src={logo} alt="" style={{ width: '210px' }} />
      <p>회원가입해주라</p>
      <p>어쩌구 스터디 sns입니다 . .</p>
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
      </div>
    </div>
    // </Sider>
  )
}
