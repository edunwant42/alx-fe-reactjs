const React = require('react')
const { render, screen, fireEvent } = require('@testing-library/react')
require('@testing-library/jest-dom')
const TodoList = require('./components/TodoList.jsx').default

describe('TodoList', () => {
  test('renders initial todos', () => {
    render(React.createElement(TodoList))
    const list = screen.getByTestId('todo-list')
    expect(list).toBeInTheDocument()
    expect(list.querySelectorAll('li').length).toBe(3)
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  test('adds a new todo', () => {
    render(React.createElement(TodoList))
    fireEvent.change(screen.getByTestId('new-todo-input'), { target: { value: 'New task' } })
    fireEvent.click(screen.getByTestId('add-todo-button'))
    const list = screen.getByTestId('todo-list')
    expect(list.querySelectorAll('li').length).toBe(4)
    expect(screen.getByText('New task')).toBeInTheDocument()
  })

  test('toggles a todo', () => {
    render(React.createElement(TodoList))
    const checkbox = screen.getByTestId('toggle-1')
    expect(checkbox).not.toBeChecked()
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  test('deletes a todo', () => {
    render(React.createElement(TodoList))
    const deleteBtn = screen.getByTestId('delete-1')
    fireEvent.click(deleteBtn)
    const list = screen.getByTestId('todo-list')
    expect(list.querySelectorAll('li').length).toBe(2)
    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
  })
})
