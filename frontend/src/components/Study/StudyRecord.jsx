import { Card, List } from 'antd'
import React from 'react'

function StudyRecord({ study }) {
  return (
    <>
      <Card
        title="📢 지난 스터디 공지"
        bordered={false}
        style={{ boxShadow: 'none' }}
      >
        <ul>
          {study.studyNotices
            ?.filter(
              notice =>
                notice.id !==
                study.studyNotices?.reduce((a, b) => {
                  return a.id > b.id ? a : b
                }, 0),
            )
            .map(notice => (
              <li>{notice.content}</li>
            ))}
        </ul>
      </Card>
      <Card
        title="🐾 우리가 걸어온 발자취"
        bordered={false}
        style={{ boxShadow: 'none' }}
      >
        <List
          itemLayout="horizontal"
          dataSource={study.sessions
            .filter(session => session.status === 0)
            .toSorted(
              (a, b) =>
                new Date(a.endedAt).getTime() - new Date(b.endedAt).getTime(),
            )}
          renderItem={session => (
            <List.Item>
              <List.Item.Meta
                title={session.title}
                description={
                  <div>
                    <p style={{ fontSize: '12px' }}>{session.description}</p>
                    <p style={{ fontSize: '12px' }}>
                      끝난 시간 -{' '}
                      {new Date(session.endedAt).toLocaleDateString()}
                    </p>
                  </div>
                }
              />
              {session.status === 0 ? <p>✔</p> : <p>🕑</p>}
            </List.Item>
          )}
        />
      </Card>
    </>
  )
}

export default StudyRecord
