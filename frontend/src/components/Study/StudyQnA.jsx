import React from 'react'
import { Collapse } from 'antd'

function QnA({ qnas }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <div className="big_box">
        {qnas?.map(qna => (
          <Collapse
            size="large"
            items={[
              {
                key: '1',
                label: (
                  <p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      {' '}
                      <h3 style={{ margin: '0px' }}>Q : {qna.question}</h3>
                      <p>작성 시간 : {qna.createdAt}</p>
                    </div>

                    <p style={{ textAlign: 'right' }}> 작성자 : {qna.userId}</p>
                  </p>
                ),
                children: (
                  <h3 style={{ textAlign: 'left' }}>A : {qna.answer}</h3>
                ),
              },
            ]}
          />
          // <p>
          //   <p>
          //     <h3>Q : {qna.question}</h3>
          //     {qna.userId} : {qna.createdAt}
          //   </p>
          //   <p>A : {qna.answer}</p>
          //   <hr />
          // </p>
        ))}
      </div>
    </>
  )
}

export default QnA
