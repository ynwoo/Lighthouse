import React, { useState } from 'react'
import { over } from '@stomp/stompjs'
import { SockJS } from 'sockjs-client'

function ChatRoom() {
  const [publicChats, setpublicChats] = useState([])
  const [privateChats, setprivateChats] = useState(new Map())
  const [tab, setTab] = useState('CHATROOM')
  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: '',
  })

  const handleValue = e => {
    const [value, name] = e.target
    setUserData({ ...userData, [name]: value })
  }

  const onPublicMessageReceived = payload => {
    const payloadData = JSON.parse(payload.body)
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, [])
          setprivateChats(new Map(privateChats))
        }
        break
      case 'MESSAGE':
        publicChats.push(payloadData)
        setpublicChats([...publicChats])
        break
    }
  }
  const onPrivateMessageReceived = payload => {
    const payloadData = JSON.parse(payload)
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData)
      setprivateChats(new Map(privateChats))
    } else {
      const list = []
      list.push(payloadData)
      privateChats.set(payloadData.senderName, list)
      setprivateChats(new Map(privateChats))
    }
  }

  const onConnected = () => {
    setUserData({ ...userData, connected: true })
    stompClient.subscribe('/chatroom/public', onPublicMessageReceived)
    stompClient.subscribe(
      `/user/${userData.username}/private`,
      onPrivateMessageReceived,
    )
    userJoin()
  }

  const userJoin = () => {
    const chatMessage = {
      senderName: userData.username,
      status: 'JOIN',
    }
    stompClient.send('/app/message', {}, JSON.stringify(chatMessage))
  }

  const onError = err => {
    console.log(err)
  }

  const registerUser = () => {
    const Sock = new SockJS(process.env.REACT_APP_API_URL)
    const stompClient = over(Sock)
    stompClient.connect({}, onConnected, onError)
  }

  const sendPublicMessage = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE',
      }
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage))
      setUserData({ ...userData, message: '' })
    }
  }
  const sendPrivateMessage = () => {
    if (stompClient) {
      const chatMessage = {
        senderName: userData.username,
        receivername: tab,
        message: userData.message,
        status: 'MESSAGE',
      }
      if (userData.username !== tab) {
        privateChats.set(tab).push(chatMessage)
        setprivateChats(new Map(privateChats))
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage))
      setUserData({ ...userData, message: '' })
    }
  }

  return (
    <div>
      {userData.connected ? (
        <div>
          <div>
            <ul>
              <li
                onClick={() => {
                  setTab('CHATROOM')
                }}
              >
                Chatroom
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name)
                  }}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === 'CHATROOM' && (
            <div>
              <ul>
                {publicChats.map((chat, index) => (
                  <li key={index}>
                    {chat.senderName !== userData.username && <div>{chat}</div>}
                    <div>{chat.message}</div>
                    {chat.senderName === userData.username && <div>{chat}</div>}
                  </li>
                ))}
              </ul>
              <div>
                <input
                  type="text"
                  name="message"
                  placeholder="enter public message"
                  value={userData.message}
                  onChange={handleValue}
                />
                <button type="button" onClick={sendPublicMessage}>
                  send
                </button>
              </div>
            </div>
          )}
          {tab !== 'CHATROOM' && (
            <div>
              {[...privateChats.get(tab)].map((chat, index) => (
                <li key={index}>
                  {chat.senderName !== userData.username && <div>{chat}</div>}
                  <div>{chat.message}</div>
                  {chat.senderName === userData.username && <div>{chat}</div>}
                </li>
              ))}
              <div>
                <input
                  name="message"
                  type="text"
                  placeholder={`enter private message for ${tab}`}
                  value={userData.message}
                  onChange={handleValue}
                />
                <button type="button" onClick={sendPrivateMessage}>
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter the user name"
            id="user.name"
            name="username"
            value={userData.username}
            onChange={handleValue}
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatRoom
