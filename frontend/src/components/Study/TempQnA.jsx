import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ImageSlide from '../Utils/ImageSlide'
import dummy from '../../db/data.json'
import TempCard from './TempCard'

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
  const text = useSelector(state => state.study.value)
  const filterdData = dummy.study_list.filter(item => item.title.includes(text))

  console.log(sessionStorage.getItem('isLoggedIn'))
  const imageData = [
    {
      id: 1,
      url: '/assets/imgs/good.jpg',
      alt: 'Good',
      card: <TempCard study={filterdData[0]} />,
    },
    {
      id: 2,
      url: '/assets/imgs/genius.jpg',
      alt: 'Genius',
      card: <TempCard study={filterdData[1]} />,
    },
  ]

  return (
    <div>
      <ImageSlide imageData={imageData} />
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Enter a new todo..."
        />
        <button type="submit" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleComplete(todo.id)}
          />
          <span
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.text}
          </span>
          <button type="submit" onClick={() => handleDeleteTodo(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </div>
  )
}

export default TodoList
