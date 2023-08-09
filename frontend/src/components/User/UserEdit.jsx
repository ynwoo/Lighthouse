import React, { useState } from 'react'
import { Form, Select } from 'antd'

// 템플릿 상세의 질의응답

export default function UserEdit() {
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
        height: '500px',
        border: '2px solid #999999',
        borderRadius: '20px',
        textAlign: 'center',
        backgroundColor: 'white',
        // display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        margin: '20px',
        padding: '20px',
        alignItems: 'center',
      }}
    >
      ;
      <div className="circular-image">
        <img src="/logo192.png" alt="안뜸" />
      </div>
      <div className="container2">
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
        <div
          style={{
            display: 'flex',
            // margin: '0px',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginTop: '25px',
            marginRight: '50px',
          }}
        >
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
        <div className="u_item" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            // marginRight: '20px',
            // marginBottom: '20px',
          }}
        >
          <div className="ue_item">관심 분야를 선택해주세요.</div>
          <div
            className="u_item"
            style={{
              display: 'flex',
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
            &nbsp;&nbsp;&nbsp;
            <label htmlFor="공무원">
              <input
                type="checkbox"
                id="공무원"
                name="공무원"
                checked={checkboxValues.checkbox1}
                onChange={handleCheckboxChange}
              />
              공무원&nbsp;
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
