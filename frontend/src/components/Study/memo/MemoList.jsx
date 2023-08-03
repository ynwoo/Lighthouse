// MemoList.jsx
import React from 'react'

function MemoList({ memos, onDeleteMemo }) {
  return (
    <div style={{ width: '50%' }}>
      <ul>
        {memos.map(memo => (
          <li key={memo.id}>
            {memo.text}
            <button type="submit" onClick={() => onDeleteMemo(memo.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MemoList
