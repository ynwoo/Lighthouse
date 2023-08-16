import React from 'react'
import { Card } from 'antd'
// 현재 진행 중인 스터디의 상세 페이지
export default function StudyCurrent({ study }) {
  console.log('studyInfo : ', study)

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
          title="스터디 공지"
          bordered={false}
          style={{ boxShadow: 'none' }}
        >
          <div style={{ display: 'flex', flexGrow: 1 }}>
            <p>
              {
                study.studyNotices?.reduce(
                  (res, now) =>
                    new Date(res.createdAt).getTime() >
                    new Date(now.createdAt).getTime()
                      ? res
                      : now,
                  0,
                ).content
              }
            </p>
          </div>
        </Card>
        <Card
          title="현재 진행 중"
          bordered={false}
          style={{ boxShadow: 'none' }}
        >
          <div>진행 중인 커리큘럼</div>
        </Card>
      </div>
    </div>
  )
}
