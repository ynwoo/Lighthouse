import React, { useState } from 'react'
import { Table, Space, Input, Button } from 'antd'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const handleAddTodo = () => {
    if (newTodo.trim() === '') {
      return
    }

    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now(),
        text: newTodo,
        completed: false,
      },
    ])

    setNewTodo('')
  }

  const handleToggleComplete = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const handleDeleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const columns = [
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      render: (_, record) => (
        <input
          type="checkbox"
          checked={record.completed}
          onChange={() => handleToggleComplete(record.id)}
        />
      ),
    },
    {
      title: 'Todo',
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
        <Space size="middle">
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
      <h3>Todo List</h3>
      <div style={{ display: 'flex' }}>
        <Input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Enter a new todo..."
        />
        <Button type="primary" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </div>
      <Table columns={columns} dataSource={tableData} />
    </div>
  )
}

export default TodoList
