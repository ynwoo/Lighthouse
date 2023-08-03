import { Button, Form, Input } from 'antd'
import React from 'react'
// import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import axios from 'axios'

function Chat() {
  const client = new Client({
    brokerURL: `ws://i9a409.p.ssafy.io:8081/ws/chat`,
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

  client.onConnect = frame => {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
    console.log(frame)
    client.subscribe('/sub/1', data => {
      console.log('callback', data)
    })
  }

  client.onStompError = function (frame) {
    console.log(`Broker reported error: ${frame.headers.message}`)
    console.log(`Additional details: ${frame.body}`)
  }

  client.activate()

  const [form] = Form.useForm()
  // 메세지
  const sendMessage = message => {
    console.log(message)
    axios.post(`http://i9a409.p.ssafy.io:8081/kafka/publish`, {
      type: 'TALK',
      roomId: '1',
      senderId: '777',
      senderName: 'shin',
      message: message.message,
    })
    form.resetFields()
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
        <div
          style={{
            width: '100%',
            height: '550px',
            border: '2px solid black',
          }}
        />
      </Form>
    </div>
  )
}

export default Chat
