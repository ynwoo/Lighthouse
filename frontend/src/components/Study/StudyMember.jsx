import React from 'react'
import { List, Divider } from 'antd'
import UserName from './UserName'

export default function StudyMember({ members }) {
  return (
    <div style={{ minHeight: '600px' }}>
      <h3>스터디원 총 {members.length} 명</h3>
      <Divider />
      <List
        itemLayout="horizontal"
        dataSource={members}
        renderItem={(member, index) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div>
                  스터디원 {index + 1} <UserName user={member} />
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}
