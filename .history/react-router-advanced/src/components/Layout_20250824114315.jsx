import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Layout() {
  const { user, signout } = useAuth()

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 900, margin: '1rem auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Routing Demo</h2>
        <nav>
          <NavLink to="/" style={{ marginRight: 12 }}>
            Home
          </NavLink>
          <NavLink to="/posts" style={{ marginRight: 12 }}>
            Posts
          </NavLink>
          <NavLink to="/profile" style={{ marginRight: 12 }}>
            Profile
          </NavLink>
          {!user ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <button onClick={() => signout()} style={{ marginLeft: 8 }}>
              Sign out
            </button>
          )}
        </nav>
      </header>

      <main style={{ marginTop: 20 }}>
        <Outlet />
      </main>
    </div>
  )
}
