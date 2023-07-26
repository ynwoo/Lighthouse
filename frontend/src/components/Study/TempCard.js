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
  console.log(study)
  return (
    // Temp Detail로 보내주는 링크
    // 그냥 컴포넌트 자체가 하나의 링크라고 보면 됨
    <Link to="/temp/{study.id}">
      <div>
        <Card
          style={{ width: 300 }}
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
            title="{study.title}"
            description="{study.is_online ? '온라인' : '오프라인'} {study.current_member}/{study.max_member}\n작성시간: {study.created_at}\n모집 마감: {study.recruit_finished_at}\n{study.like_cnt}개의 따봉"
          />
        </Card>
      </div>
    </Link>
  )
}

export default TempCard
