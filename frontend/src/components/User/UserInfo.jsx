import React from 'react'
// import { useDispatch } from 'react-redux'
import { Card, Space } from 'antd'
// import { userAction } from '../../store/user'

// 템플릿 상세의 질의응답

export default function UserInfo() {
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Card title="자기소개" bordered={false}>
        <p>안녕하세요. 멋진 스터디를 찾고 있는 커비입니다. 잘 부탁드립니다.</p>
      </Card>
      <Card title="통계" bordered={false}>
        <p>현재 진행 중인 스터디: 5</p>
        <p>완료한 스터디: 4</p>
        <p>함께한 스터디원: 17</p>
        <p>스터디장 맡은 횟수: 2</p>
      </Card>
    </Space>
  )
}
