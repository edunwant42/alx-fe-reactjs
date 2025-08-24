import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [username, setUsername] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  function handleSubmit(e) {
    e.preventDefault()
    auth.signin(username, () => navigate(from, { replace: true }))
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button style={{ marginLeft: 8 }} type="submit">
          Log in
        </button>
      </form>
    </div>
  )
}
