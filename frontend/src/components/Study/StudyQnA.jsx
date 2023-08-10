import React from 'react'

function QnA({ qnas }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <div className="big_box">
        {qnas?.map(qna => (
          <p>
            <p>
              <h3>Q : {qna.question}</h3>
              {qna.userId} : {qna.createdAt}
            </p>
            <p>A : {qna.answer}</p>
            <hr />
          </p>
        ))}
      </div>
    </>
  )
}

export default QnA
