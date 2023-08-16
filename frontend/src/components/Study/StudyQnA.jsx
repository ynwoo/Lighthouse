import React from 'react'
import { List } from 'antd'

function QnA({ qnas }) {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={qnas}
        renderItem={qna => (
          <List.Item>
            <List.Item.Meta
              title={qna.question}
              description={
                <div>
                  {qna.answer}
                  <br />
                  <br />
                  <p style={{ fontSize: '12px' }}>작성자: {qna.userId}</p>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default QnA
