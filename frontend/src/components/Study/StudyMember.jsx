import React from 'react'
import { Divider } from 'antd'
import UserProfile from '../User/UserProfile'

export default function StudyMember({ members }) {
  return (
    <div style={{ minHeight: '600px' }}>
      <h3>스터디원 총 {members.length} 명</h3>
      <Divider />
      <div className="flex-container">
        {members?.map((member, index) => (
          <div className="flex-container-col">
            {`스터디원 ${index + 1}. `}
            <UserProfile userProfile={member} />
          </div>
        ))}
      </div>
    </div>
  )
}
