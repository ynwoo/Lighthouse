import React, { useState } from 'react'
import { Form, Select, Tooltip, Modal, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

// 크게 보는 프로필

export default function UserProfile() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div
      className="comp"
      style={{
        width: '60%',
        height: '100%',
        border: '2px solid #999999',
        borderRadius: '20px',
        textAlign: 'center',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.4)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
        }}
      >
        <ArrowLeftOutlined style={{ fontSize: '30px' }} />
      </div>

      {/* 해시태그 박스 */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          left: '40px', // Move the hashtag box away from the back button
          display: 'flex',
          alignItems: 'center', // Center the text vertically
          border: '1px solid #177AEE',
          backgroundColor: '#177AEE',
          color: 'white',
          borderRadius: '20px',
          margin: '10px',
          padding: '8px',
        }}
      >
        <div>#해시태그</div>
      </div>
      <div style={{ position: 'absolute', top: '10px', right: '30px' }}>
        <Tooltip title="팔로워 목록 보기" placement="bottom">
          <div>팔로워 000</div>
        </Tooltip>
        <Tooltip title="팔로잉 목록 보기" placement="bottom">
          <div>팔로잉 000</div>
        </Tooltip>
      </div>
      <div>
        <div className="circular-image">
          <img src="/logo192.png" alt="안뜸" />
        </div>
      </div>

      <div className="f_big_bix">
        <div className="profile_bigbox">
          <div className="profile_head">
            <div className="profile_text">
              <h4>닉네임</h4>
            </div>
            <div className="profile_text">
              <h4>자기소개</h4>
            </div>
            <div className="profile_text">
              <h4>진행 중</h4>
            </div>
          </div>
          <div>
            <div className="profile_box1">
              <p>닉네임</p>
            </div>
            <div className="profile_box1">
              <p>자기소개</p>
            </div>
            <div className="profile_box1">
              <p>스터디들</p>
            </div>
            <Form.Item>
              <Select className="profile_select" value="참여했던 스터디 목록">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="profile_bigbox2">
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div>
              {/* ...프로필 컨텐츠... */}

              <Button
                type="primary"
                onClick={showModal}
                style={{
                  width: '200px',
                  marginLeft: '80px',
                  border: '1px solid #3E5D99',
                  backgroundColor: '#3E5D99',
                  color: 'white',
                  borderRadius: '20px',
                  margin: '10px',
                  padding: '8px',
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                사용중인 템플릿 보러가기
              </Button>

              <Modal
                title="사용중인 템플릿"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                {/* 모달 내용 */}
                <p>여기에 템플릿에 관한 상세한 내용을 넣을 수 있습니다.</p>
                <p>
                  더 많은 정보와 버튼 등을 추가하여 원하는 대화 상자를 만들 수
                  있습니다.
                </p>
              </Modal>
            </div>
          </div>

          <div className="profile_box1">
            <p>별점</p>
          </div>
          <div className="profile_box1">
            <p>뱃지 목록</p>
          </div>
          <div className="profile_box1">
            <p>통계</p>
          </div>
          <Form.Item>
            <Select className="profile_select" value="북마크 스터디 목록">
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </div>
    </div>
  )
}
