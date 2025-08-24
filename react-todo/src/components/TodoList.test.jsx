import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoList from '../components/TodoList.jsx'

describe('TodoList', () => {
  test('renders initial todos', () => {
    render(<TodoList />)
    const list = screen.getByTestId('todo-list')
    expect(list).toBeInTheDocument()
    // initial items are 3
    expect(list.querySelectorAll('li').length).toBe(3)
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  test('adds a new todo', () => {
    render(<TodoList />)
    fireEvent.change(screen.getByTestId('new-todo-input'), { target: { value: 'New task' } })
    fireEvent.click(screen.getByTestId('add-todo-button'))
    const list = screen.getByTestId('todo-list')
    expect(list.querySelectorAll('li').length).toBe(4)
    expect(screen.getByText('New task')).toBeInTheDocument()
  })

  test('toggles a todo', () => {
    render(<TodoList />)
    const checkbox = screen.getByTestId('toggle-1')
    expect(checkbox).not.toBeChecked()
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  test('deletes a todo', () => {
    render(<TodoList />)
    const deleteBtn = screen.getByTestId('delete-1')
    fireEvent.click(deleteBtn)
    const list = screen.getByTestId('todo-list')
    expect(list.querySelectorAll('li').length).toBe(2)
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
  })
})
