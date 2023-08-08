import { Button, Form, Input } from 'antd'
import React, { useEffect } from 'react'
// import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { useDispatch, useSelector } from 'react-redux'
import { chatAction, receiveMessage } from '../../../store/chat'
import { userAction } from '../../../store/user'

const client = new Client({
  brokerURL: `ws://i9a409.p.ssafy.io:8082/ws/chat`,
  connectHeaders: {
    login: 'user',
    passcode: 'password',
  },
  debug(callbackLog) {
    console.log(`connection:  ${callbackLog}`)
  },
  reconnectDelay: 5000, // 자동 재 연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
})

client.activate()

function Chat() {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.myInfo)
  const messages = useSelector(state => state.chat.messages)

  useEffect(() => {
    dispatch(userAction.myPage())
  }, [])
  console.log(userInfo)
  console.log(userInfo.id)

  client.onConnect = frame => {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
    console.log(`connection established: ${frame}`)
    client.subscribe('/sub/1', data => {
      const messageData = JSON.parse(data.body)
      dispatch(receiveMessage(messageData.message))
    })
  }

  client.onStompError = function (frame) {
    console.log(`Broker reported error: ${frame.headers.message}`)
    console.log(`Additional details: ${frame.body}`)
  }

  console.log(messages)
  const [form] = Form.useForm()
  // 메세지
  const sendMessage = message => {
    if (message.message) {
      dispatch(chatAction.sendChat(message.message))
      form.resetFields()
    }
  }
  return (
    <div
      style={{
        width: '50%',
        height: '600px',
        border: '3px solid black',
      }}
    >
      <Form form={form} onFinish={sendMessage}>
        <Form.Item id="messageInput" name="message">
          <Input autoFocus />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form>
      <div
        style={{
          width: '100%',
          height: '550px',
          border: '2px solid black',
        }}
      >
        {!messages.length ? (
          <p>채팅을 시작해보아요!</p>
        ) : (
          messages.map(message => <p key={message}>{message}</p>)
        )}
      </div>
    </div>
  )
}

export default Chat
