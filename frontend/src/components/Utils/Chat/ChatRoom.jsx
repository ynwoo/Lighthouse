import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import SockJS from 'sockjs-client'
import { over } from '@stomp/stompjs'

const colors = [
  '#2196F3',
  '#32c787',
  '#00BCD4',
  '#ff5652',
  '#ffc107',
  '#ff85af',
  '#FF9800',
  '#39bbb0',
]

function ChatRoom() {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [roomId, setRoomId] = useState('')
  const [isUsernamePageVisible, setIsUsernamePageVisible] = useState(true)
  const [isChatPageVisible, setIsChatPageVisible] = useState(false)
  const [isConnectingVisible, setIsConnectingVisible] = useState(true)
  const [error, setError] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [userList, setUserList] = useState([])
  const stompClient = useRef(null)

  useEffect(() => {
    setRoomId(new URL(window.location.href).searchParams.get('roomId'))
  }, [])

  const connect = async event => {
    event.preventDefault()

    setUsername(event.target.value.trim())

    const response = await axios.get('/chat/duplicateName', {
      params: {
        username,
        roomId,
      },
    })

    setUsername(response.data)

    setIsUsernamePageVisible(false)
    setIsChatPageVisible(true)

    const socket = new SockJS('/ws-stomp')
    stompClient.current = over(socket)
    stompClient.current.connect({}, onConnected, onError)
  }

  const onConnected = () => {
    stompClient.current.subscribe(`/sub/chat/room/${roomId}`, onMessageReceived)
    stompClient.current.send(
      '/pub/chat/enterUser',
      {},
      JSON.stringify({ roomId, sender: username, type: 'ENTER' }),
    )

    setIsConnectingVisible(false)
  }

  const onError = error => {
    setError(
      'Could not connect to WebSocket server. Please refresh this page to try again!',
    )
  }

  const sendMessage = event => {
    event.preventDefault()

    if (message && stompClient.current) {
      const chatMessage = {
        roomId,
        sender: username,
        message,
        type: 'TALK',
      }
      stompClient.current.send(
        '/pub/chat/sendMessage',
        {},
        JSON.stringify(chatMessage),
      )
      setMessage('')
    }
  }

  const getUserList = async () => {
    const response = await axios.get('/chat/userlist', {
      params: { roomId },
    })
    setUserList(response.data)
  }

  const onMessageReceived = payload => {
    const chat = JSON.parse(payload.body)
    const messageElement = {}

    if (chat.type === 'ENTER') {
      messageElement.type = 'event-message'
      chat.content = chat.sender + chat.message
      getUserList()
    } else if (chat.type === 'LEAVE') {
      messageElement.type = 'event-message'
      chat.content = chat.sender + chat.message
      getUserList()
    } else {
      messageElement.type = 'chat-message'
      messageElement.avatarColor = getAvatarColor(chat.sender)
      messageElement.sender = chat.sender
    }

    if (chat.s3DataUrl != null) {
      messageElement.imgSrc = chat.s3DataUrl
      messageElement.fileName = chat.fileName
      messageElement.fileDir = chat.fileDir
    } else {
      messageElement.message = chat.message
    }

    setChatMessages([...chatMessages, messageElement])
  }

  const getAvatarColor = messageSender => {
    let hash = 0
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i)
    }
    const index = Math.abs(hash % colors.length)
    return colors[index]
  }

  return (
    <div>
      {isUsernamePageVisible && (
        <form onSubmit={connect}>
          <input type="text" onChange={e => setUsername(e.target.value)} />
          <button type="submit">Connect</button>
        </form>
      )}

      {isChatPageVisible && (
        <div>
          <ul>
            {chatMessages.map((message, index) => (
              <li key={index} className={message.type}>
                <span style={{ backgroundColor: message.avatarColor }}>
                  {message.sender}
                </span>
                {message.imgSrc ? (
                  <>
                    <img src={message.imgSrc} width="300" height="300" />
                    <button
                      className="btn fa fa-download"
                      id="downBtn"
                      name={message.fileName}
                      onClick={() =>
                        downloadFile(message.fileName, message.fileDir)
                      }
                    />
                  </>
                ) : (
                  <p>{message.message}</p>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              onChange={e => setMessage(e.target.value)}
              value={message}
            />
            <button type="submit">Send</button>
          </form>
          <div>
            <h3>Active Users</h3>
            <ul>
              {userList.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isConnectingVisible && (
        <div className="connecting">
          Connecting...
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
      )}
    </div>
  )
}

export default ChatRoom
