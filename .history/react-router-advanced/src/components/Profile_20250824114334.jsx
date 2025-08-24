import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Profile() {
  const { user } = useAuth()

  return (
    <div>
      <h3>Profile</h3>
      <p>Welcome, {user?.name}</p>
      <nav style={{ marginBottom: 12 }}>
        <Link to="/profile">Details</Link>
        <Link to="settings" style={{ marginLeft: 8 }}>
          Settings
        </Link>
      </nav>

      <div style={{ padding: 12, border: '1px solid #eee' }}>
        <Outlet />
      </div>
    </div>
  )
}
