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
  const [checkboxValues, setCheckboxValues] = useState({
    개발: false,
    알고리즘: false,
    CS: false,
    면접: false,
    공무원: false,
    인적성: false,
    수능: false,
    영어: false,
    // 필요한 만큼 체크박스 상태 변수를 추가할 수 있습니다.
  })

  const handleCheckboxChange = event => {
    const { name, checked } = event.target
    setCheckboxValues({
      ...checkboxValues,
      [name]: checked,
    })
  }

  return (
    <div className="big_box">
      <div className="grid-container">
        <div className="item">
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              // alignItems: 'center', // Center the text vertically
              border: '1px solid #177AEE',
              backgroundColor: '#177AEE',
              color: 'white',
              borderRadius: '20px',
              padding: '8px',
              flexDirection: 'flex-start',
              marginTop: '20px',
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
              marginTop: '20px',
              marginLeft: '200px',
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
        {/* <div className="u_item">뱃지 목록</div>
        <div className="u_item1">뱃지 목록</div>
        <div className="u_item">진행 중</div>
        <div className="u_item1">진행 중</div>
        <div className="u_item">통계</div>
        <div className="u_item1">통계</div> */}
        <div className="u_item">참여했던 스터디</div>
        <div style={{ display: 'flex' }}>
          <Form.Item>
            <div style={{ width: '70%' }}>
              <Select className="u_item2" value="참여했던 스터디">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </div>
          </Form.Item>
          <Form.Item>
            <div style={{ width: '70%' }}>
              <Select className="u_item2" value="참여했던 스터디">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </div>
          </Form.Item>
        </div>
        <div className="u_item">닉네임</div>
        <div className="u_item1">닉네임</div>
        <div className="u_item">별점</div>
        <div className="u_item1">별점</div>
        <div className="u_item">자기소개</div>
        <div className="u_item1">자기소개</div>
        <div className="u_item">닉네임</div>
        <div className="u_item1">닉네임</div>
        <div className="u_item">별점</div>
        <div className="u_item1">별점</div>
        <div>관심 분야를 선택해주세요.</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginRight: '20px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              // flexDirection: 'column',
            }}
          >
            <label htmlFor="개발">
              <input
                type="checkbox"
                id="개발"
                name="개발"
                checked={checkboxValues.checkbox1}
                onChange={handleCheckboxChange}
              />
              개발&nbsp;&nbsp;&nbsp;
            </label>
            <div style={{ marginRight: '10px' }}>
              <label htmlFor="알고리즘">
                <input
                  type="checkbox"
                  id="알고리즘"
                  name="알고리즘"
                  checked={checkboxValues.checkbox1}
                  onChange={handleCheckboxChange}
                />
                알고리즘
              </label>
            </div>
            <div style={{ marginRight: '10px' }}>
              <label htmlFor="CS">
                <input
                  type="checkbox"
                  id="CS"
                  name="CS"
                  checked={checkboxValues.checkbox1}
                  onChange={handleCheckboxChange}
                />
                CS
              </label>
            </div>
            <div style={{ marginRight: '10px' }}>
              <label htmlFor="면접">
                <input
                  type="checkbox"
                  id="면접"
                  name="면접"
                  checked={checkboxValues.checkbox1}
                  onChange={handleCheckboxChange}
                />
                면접
              </label>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              // flexDirection: 'column',
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
            }}
          >
            <label htmlFor="공무원">
              <input
                type="checkbox"
                id="공무원"
                name="공무원"
                checked={checkboxValues.checkbox1}
                onChange={handleCheckboxChange}
              />
              공무원
            </label>
            <div style={{ marginRight: '10px' }}>
              <label htmlFor="인적성">
                <input
                  type="checkbox"
                  id="인적성"
                  name="인적성"
                  checked={checkboxValues.checkbox1}
                  onChange={handleCheckboxChange}
                />
                인적성
              </label>
            </div>
            <div style={{ marginRight: '10px' }}>
              <label htmlFor="수능">
                <input
                  type="checkbox"
                  id="수능"
                  name="수능"
                  checked={checkboxValues.checkbox1}
                  onChange={handleCheckboxChange}
                />
                수능
              </label>
            </div>
            <div style={{ marginRight: '10px' }}>
              <label htmlFor="영어">
                <input
                  type="checkbox"
                  id="영어"
                  name="영어"
                  checked={checkboxValues.checkbox1}
                  onChange={handleCheckboxChange}
                />
                영어
              </label>
            </div>
          </div>
        </div>
        {/* <div classN
        {/* <div className="u_item">북마크</div>
        <div className="u_item1">북마크</div> */}
      </div>
    </div>
  )
}
