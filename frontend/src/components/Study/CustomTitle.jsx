import React from 'react'

function CustomTitle({ text }) {
  return (
    <h3
      style={{
        margin: '5px 0px 0px 0px',
        overflow: 'hidden',
        whiteSpace: 'normal',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        wordBreak: 'keep-all',
      }}
    >
      {text}
    </h3>
  )
}

export default CustomTitle
