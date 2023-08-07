import React, { useState } from 'react'
import { Table, Input, Button, Space } from 'antd'

function CurriculumTable() {
  const [curriculum, setCurriculum] = useState('')
  const [todos, setTodos] = useState([])

  const handleAddCurriculum = () => {
    if (curriculum.trim() === '') {
      return
    }

    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now(),
        text: curriculum,
        completed: false,
      },
    ])

    setCurriculum('')
  }

  const handleDeleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const columns = [
    {
      title: 'Curriculum',
      dataIndex: 'text',
      key: 'text',
      render: (text, record) => (
        <span
          style={{
            textDecoration: record.completed ? 'line-through' : 'none',
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleDeleteTodo(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ]

  const tableData = todos.map(todo => ({
    ...todo,
    key: todo.id,
  }))

  return (
    <div>
      <div className="info_text">
        <ul>
          <p>신청대상</p>
        </ul>
      </div>

      <Table columns={columns} dataSource={tableData} />
      <Space style={{ marginBottom: 16 }}>
        <Input
          type="text"
          value={curriculum}
          onChange={e => setCurriculum(e.target.value)}
          placeholder="Enter a new curriculum..."
        />
        <Button type="primary" onClick={handleAddCurriculum}>
          Add Curriculum
        </Button>
      </Space>
    </div>
  )
}

export default CurriculumTable
