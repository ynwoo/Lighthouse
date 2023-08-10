import React from 'react'

function QnA({ qnas }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {qnas?.map(qna => (
        <p>
          <p>
            {qna.userId} : {qna.question}, {qna.createdAt}
          </p>
          <p>방장 : {qna.answer}</p>
        </p>
      ))}
    </>
  )
}

export default QnA
