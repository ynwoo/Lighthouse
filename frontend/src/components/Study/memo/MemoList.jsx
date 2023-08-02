// MemoList.jsx
import React from 'react'

function MemoList({ memos }) {
  return (
    <div style={{ width: '50%' }}>
      <ul>
        {memos.map(memo => (
          <li key={memo.id}>{memo.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default MemoList
