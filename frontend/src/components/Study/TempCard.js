import React from 'react'
import { Link } from 'react-router-dom'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;


// 템플릿 카드

export default function TempCard() {
  return (
    // Temp Detail로 보내주는 링크
    // 그냥 컴포넌트 자체가 하나의 링크라고 보면 됨
    <Link to="/temp/fromTempCard">
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
            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
            title="Card title"
            description="This is the description"
          />
        </Card>
      </div>
    </Link>
  )
}
