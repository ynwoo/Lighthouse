import React from 'react'
import { Card, Space } from 'antd'

// 템플릿 상세의 질의응답

export default function UserInfo({ profile }) {
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Card title="자기소개" bordered={false}>
        <p>{profile.description}</p>
      </Card>
      <Card title="통계" bordered={false}>
        <p>현재 진행 예정인 스터디: {profile.recruitingStudies.length}</p>
        <p>현재 진행 중인 스터디: {profile.progressStudies.length}</p>
        <p>완료한 스터디: {profile.terminatedStudies.length}</p>
        <p>북마크한 스터디: {profile.bookmarkStudies.length}</p>
        <p>
          함께한 스터디원:{' '}
          {profile.recruitingStudies
            .concat(profile.terminatedStudies)
            .reduce((a, b) => a + b.currentMember, 0)}
        </p>
        <p>
          스터디장 맡은 횟수:{' '}
          {
            profile.recruitingStudies
              .concat(profile.terminatedStudies)
              .filter(study => study.leaderProfile.id === profile.id).length
          }
        </p>
      </Card>
    </Space>
  )
}
