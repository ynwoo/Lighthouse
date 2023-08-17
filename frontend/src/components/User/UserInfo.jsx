import React from 'react'
import { Card, Space, Row, Col } from 'antd'
import Piechart from '../Study/utils/chart/PieChart'
import { image } from '../../utils/image'
import Barchart from '../Study/utils/chart/BarChart'
import UserStarRating from '../atoms/UserStarRating'

// 템플릿 상세의 질의응답

export default function UserInfo({ profile }) {
  const recruit = profile.recruitingStudies.length
  const progress = profile.progressStudies.length
  const terminated = profile.terminatedStudies.length
  const chartData = [
    { id: '모집중', value: recruit },
    { id: '진행중', value: progress },
    { id: '완료', value: terminated },
  ]

  const barData = [
    { study: '모집중', recruit },
    { study: '진행중', progress },
    { study: '완료', terminated },
  ]
  return (
    <Space
      className="user-info"
      direction="vertical"
      size="middle"
      style={{ display: 'flex', minWidth: '600px' }}
    >
      <Card title="자기소개" bordered={false}>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <p style={{ 'margin-right': 'auto' }}>{profile.description}</p>
        </div>
      </Card>
      <Card title="통계" bordered={false}>
        <UserStarRating className="user-star-rating" score={profile.score} />
        평균 평가 점수: {profile.score}
        <p style={{ marginTop: '10px' }}>
          현재 진행 예정인 스터디: {profile.recruitingStudies.length}
        </p>
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
      <Card title="뱃지" bordered={false}>
        {profile.badges?.map(badge => (
          <img
            src={image(badge.imgUrl)}
            alt={badge.description}
            className="badge"
          />
        ))}
      </Card>
      <Card title="차트" bordered={false}>
        <Row>
          <Col>
            <Barchart className="chart" data={barData} />
          </Col>
          <Col>
            <Piechart className="chart" data={chartData} />
          </Col>
        </Row>
      </Card>
    </Space>
  )
}
