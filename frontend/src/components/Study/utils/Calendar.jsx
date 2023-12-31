import { Badge, Calendar, Modal, Form, Input, Button, DatePicker } from 'antd'
import React, { useState } from 'react'

export default function App() {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [events, setEvents] = useState([
    {
      id: 1, // 고유한 식별자를 추가합니다.
      date: '2023-08-15',
      type: 'warning',
      content: '스터디',
    },
    {
      id: 2, // 고유한 식별자를 추가합니다.
      date: '2023-08-15',
      type: 'success',
      content: 'This is a success event',
    },
    // Add more events as needed...
  ])

  const handleDelete = item => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== item.id))
  }

  const getListData = value => {
    const dateString = value.format('YYYY-MM-DD')
    return events.filter(event => event.date === dateString)
  }

  const dateCellRender = value => {
    const listData = getListData(value)
    return (
      <div className="events">
        {listData.map(item => (
          <li key={item.id}>
            {' '}
            {/* 고유한 식별자를 key로 사용합니다. */}
            <Badge
              status={item.type}
              text=<span style={{ fontSize: '10px' }}>{item.content}</span>
            />
            <Button
              onClick={() => handleDelete(item)}
              style={{
                color: 'red',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '8px',
              }}
            >
              X
            </Button>
          </li>
        ))}
      </div>
    )
  }

  // handleOk 함수 내의 setEvents 부분을 다음과 같이 수정합니다.
  const handleOk = () => {
    form.validateFields().then(values => {
      const { date, type, content } = values
      setEvents(prevEvents => [
        ...prevEvents,
        {
          id: Date.now(), // 고유한 식별자를 추가합니다.
          date: date ? date.format('YYYY-MM-DD') : '', // 기본값 설정
          type: type || '', // 기본값 설정
          content: content || '', // 기본값 설정
        },
      ])
      form.resetFields()
      setVisible(false)
    })
  }

  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  const showModal = () => {
    setVisible(true)
  }

  return (
    <div className="big_box">
      <Calendar dateCellRender={dateCellRender} />
      <Button onClick={showModal}>Add Event</Button>
      <Modal
        visible={visible}
        title="Add Event"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
