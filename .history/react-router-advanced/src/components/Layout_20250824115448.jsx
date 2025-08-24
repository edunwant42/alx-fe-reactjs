import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Layout() {
  const { user, signout } = useAuth()

  return (
    <div className="app-container">
      <header>
        <h2>Routing Demo</h2>
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/posts" className={({ isActive }) => (isActive ? 'active' : '')}>
            Posts
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
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

      <main>
        <Outlet />
      </main>
    </div>
  )
}
