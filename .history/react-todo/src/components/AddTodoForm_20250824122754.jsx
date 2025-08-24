import React, { useState } from 'react'

export default function AddTodoForm({ onAdd }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!value.trim()) return
    onAdd(value.trim())
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
      <input data-testid="new-todo-input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add todo" />
      <button data-testid="add-todo-button" type="submit" style={{ marginLeft: 8 }}>
        Add
      </button>
    </form>
  )
}
