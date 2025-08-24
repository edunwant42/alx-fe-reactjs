import React, { useState } from 'react'
import AddTodoForm from './AddTodoForm.jsx'

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy milk', completed: false },
    { id: 2, text: 'Walk dog', completed: true },
    { id: 3, text: 'Read book', completed: false },
  ])

  function addTodo(text) {
    setTodos((t) => [...t, { id: Date.now(), text, completed: false }])
  }

  function toggleTodo(id) {
    setTodos((t) => t.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  function deleteTodo(id) {
    setTodos((t) => t.filter((item) => item.id !== id))
  }

  return (
    <div>
      <h3>Todo List</h3>
      <AddTodoForm onAdd={addTodo} />
      <ul data-testid="todo-list">
        {todos.map((td) => (
          <li key={td.id}>
            <label style={{ textDecoration: td.completed ? 'line-through' : 'none', cursor: 'pointer' }}>
              <input data-testid={`toggle-${td.id}`} type="checkbox" checked={td.completed} onChange={() => toggleTodo(td.id)} />{' '}
              <span>{td.text}</span>
            </label>
            <button data-testid={`delete-${td.id}`} onClick={() => deleteTodo(td.id)} style={{ marginLeft: 8 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
