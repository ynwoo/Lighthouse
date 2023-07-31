import React, { useState } from 'react'
import { Form, Select } from 'antd'

export default function UserEdit() {
  // 체크박스 상태를 관리하기 위한 상태 변수
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
    <div
      className="comp"
      style={{
        width: '80%',
        height: '100%',
        border: '2px solid #999999',
        borderRadius: '20px',
        textAlign: 'center',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        flexWrap: 'wrap',
      }}
    >
      <div className="circular-image">
        <img src="/logo192.png" alt="안뜸" />
      </div>
      <div style={{ display: 'flex', marginTop: '50px', flexWrap: 'wrap' }}>
        <div>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="edit_text">
              <p>이메일</p>
            </div>
            <div className="profile_box1">
              <p>별점</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="edit_text">
              <p>비밀번호</p>
            </div>
            <div className="profile_box1">
              <p>별점</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="edit_text">
              <p>비밀번호 확인</p>
            </div>
            <div className="profile_box1">
              <p>별점</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="edit_text">
              <p>이름</p>
            </div>
            <div className="profile_box1">
              <p>별점</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="edit_text">
              <p>나이</p>
            </div>
            <div className="profile_box1">
              <p>별점</p>
            </div>
          </div>
        </div>
        <div>
          {/* 추가된 부분 시작 */}
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="edit_text">
              <p>추가된 텍스트1</p>
            </div>
            <div className="profile_box1">
              <p>추가된 박스1</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="edit_text">
              <p>추가된 텍스트2</p>
            </div>
            <div className="profile_box1">
              <p>추가된 박스2</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="edit_text">
              <p>추가된 텍스트2</p>
            </div>
            {/* <div className="profile_box1"> */}
            <div
              style={{
                display: 'flex',
                marginRight: '20px',
                marginTop: '20px',
              }}
            >
              <Form.Item>
                <Select className="edit_select" value="지역(시)">
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Select className="edit_select" value="지역(구)">
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              {/* </div> */}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              className="check_total"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end', // Align checkboxes to the right
                justifyContent: 'flex-end', // Align the "check_total" div to the right
                marginRight: '20px',
                marginBottom: '20px',
              }}
            >
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
            </div>
          </div>
        </div>
      </div>
      {/* check box 시작 */}
    </div>
  )
}
