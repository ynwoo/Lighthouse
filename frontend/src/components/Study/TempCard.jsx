import React from 'react'
import { Link } from 'react-router-dom'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Avatar, Card } from 'antd'

const { Meta } = Card

// 템플릿 카드

function TempCard({ study }) {
  return (
    // Temp Detail로 보내주는 링크
    // 그냥 컴포넌트 자체가 하나의 링크라고 보면 됨
    <Link to={`/temp/${study.id}`} state={{ id: study.id }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <Card
          style={{
            width: 300,
            margin: '25px',
            whiteSpace: 'pre-line',
            height: '100%',
          }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
            }
            title={study.title}
            description={`작성자: ${study.leaderProfile.nickname}
                          ${study.is_online ? '온라인' : '오프라인'}
                          ${study.currentMember}/${study.maxMember}
                          작성시간: ${study.createdAt}
                          모집 마감: ${study.recruitFinishedAt}
                          ${study.bookmarkCnt}명이 북마크
                          `}
          />
          {study.studyTags.map(tag => {
            return <span key={tag.id}>#{tag.keyword}</span>
          })}
        </Card>
      </div>
    </Link>
  )
}

export default TempCard
