import React, { useState } from 'react' // useState를 추가로 import

import chat from '../../../static/chat.png'

export default function ChatList() {
  const [showChat, setShowChat] = useState(false)

  const handleChatClick = () => {
    setShowChat(!showChat)
  }

  return (
    <div>
      <button
        type="submit"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer',
          border: 'none',
          background: 'none',
          padding: 0,
          margin: 0,
          zIndex: '1',
        }}
        onClick={handleChatClick}
      >
        <img src={chat} alt="채팅" style={{ width: '100px' }} />
      </button>
      {showChat && (
        // 채팅창이 보일 때만 아래 코드가 렌더링됨
        <div
          style={{
            position: 'fixed',
            width: '200px',
            height: '200px',
            bottom: '90px',
            right: '70px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          채팅창
        </div>
      )}
    </div>
  )
}
