import React, { useState } from 'react'
import { Form, Select, Modal, Button, Tooltip } from 'antd'

// 템플릿 상세의 질의응답

export default function TempQnA() {
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
        // display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.4)',
        position: 'relative',
      }}
    >
      <div className="circular-image">
        <img src="/logo192.png" alt="안뜸" />
      </div>
      <div className="grid-container">
        <div className="item">
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center', // Center the text vertically
              border: '1px solid #177AEE',
              backgroundColor: '#177AEE',
              color: 'white',
              borderRadius: '20px',
              padding: '8px',
            }}
          >
            <div>#해시태그</div>
          </div>
        </div>
        <div className="item">
          <Button
            type="primary"
            onClick={showModal}
            style={{
              width: '200px',
              border: '1px solid #3E5D99',
              backgroundColor: '#3E5D99',
              color: 'white',
              borderRadius: '20px',
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
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%', // Adjust the left property to move the modal to the right
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* 모달 내용 */}
            <p>여기에 템플릿에 관한 상세한 내용을 넣을 수 있습니다.</p>
            <p>
              더 많은 정보와 버튼 등을 추가하여 원하는 대화 상자를 만들 수
              있습니다.
            </p>
          </Modal>
        </div>
        <div className="item">
          <div style={{ position: 'absolute', top: '10px', right: '30px' }}>
            <Tooltip title="팔로워 목록 보기" placement="bottom">
              <div>팔로워 000</div>
            </Tooltip>
            <Tooltip title="팔로잉 목록 보기" placement="bottom">
              <div>팔로잉 000</div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="container1">
        <div className="u_item">닉네임</div>
        <div className="u_item1">닉네임</div>
        <div className="u_item">별점</div>
        <div className="u_item1">별점</div>
        <div className="u_item">자기소개</div>
        <div className="u_item1">자기소개</div>
        <div className="u_item">뱃지 목록</div>
        <div className="u_item1">뱃지 목록</div>
        <div className="u_item">진행 중</div>
        <div className="u_item1">진행 중</div>
        <div className="u_item">통계</div>
        <div className="u_item1">통계</div>
        <div className="u_item">참여했던 스터디</div>

        <Form.Item>
          <Select className="u_item2" value="지역(시)">
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <div className="u_item">북마크</div>
        <div className="u_item1">북마크</div>
      </div>
    </div>
  )
}
