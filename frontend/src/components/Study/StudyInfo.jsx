import React from 'react'
import { Card } from 'antd'
import StudyCurriculum from './StudyCurriculum'

export default function StudyInfo({ study }) {
  return (
    <div>
      <div
        style={{
          height: '1000px',
          width: '100%',
          backgroundColor: 'rgb(255, 255, 255)',
        }}
      >
        <Card
          title="스터디 정보"
          bordered={false}
          style={{ boxShadow: 'none' }}
        >
          <div>
            <p>{study.description}</p>
            <br />
            스터디 규칙: <br />
            {study.rule?.split('\n')?.map((rulee, i) => (
              <p key={i}>{rulee}</p>
            ))}
          </div>
        </Card>
        <Card
          title="스터디 계획"
          bordered={false}
          style={{ boxShadow: 'none' }}
        >
          <div>
            <StudyCurriculum study={study} />
          </div>
        </Card>
      </div>
    </div>
  )
}
