// MemoInput.jsx
import React, { useState } from 'react'
import { Button, Input } from 'antd'

function MemoInput({ onAddMemo }) {
  const [memo, setMemo] = useState('')

  const handleAddMemo = () => {
    if (memo.trim() === '') {
      return
    }
    onAddMemo(memo)
    setMemo('')
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '70%',
          display: 'flex',
        }}
      >
        <Input
          type="text"
          value={memo}
          onChange={e => setMemo(e.target.value)}
          placeholder="모집 대상을 입력해주세요"
        />
        <Button type="primary" onClick={handleAddMemo}>
          Add Memo
        </Button>
      </div>
    </div>
  )
}

export default MemoInput
