import { Button, Form, Input } from 'antd'
import React from 'react'
// import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { useDispatch, useSelector } from 'react-redux'
import { chatAction, receiveMessage } from '../../../store/chat'

const client = new Client({
  brokerURL: `ws://i9a409.p.ssafy.io:8082/ws/chat`,
  connectHeaders: {
    login: 'user',
    passcode: 'password',
  },
  debug(str) {
    console.log(str)
  },
  reconnectDelay: 5000, // 자동 재 연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
})

client.activate()

function Chat() {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.chat.messages)

  client.onConnect = frame => {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
    console.log(frame)
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
        width: '30%',
        height: '600px',
        border: '1px solid black',
        borderRadius: '20px',
      }}
    >
      <Form form={form} onFinish={sendMessage}>
        <div style={{ display: 'flex' }}>
          <Form.Item id="messageInput" name="message">
            <Input
              autoFocus
              style={{
                borderRadius: '20px',
                border: '1px solid black',
                height: '40px',
                width: '390px',
              }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </div>
      </Form>
      <div
        style={{
          width: '100%',
          height: '550px',
          // border: '1px solid black',
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
