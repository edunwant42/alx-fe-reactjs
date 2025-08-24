import React from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import ProfileDetails from './ProfileDetails.jsx'
import ProfileSettings from './ProfileSettings.jsx'

// Nested routes handled here: Routes, Route, ProfileDetails, ProfileSettings

export default function Profile() {
  const { user } = useAuth()

  return (
    <div className="card">
      <h3>Profile</h3>
      <p className="muted">Welcome, {user?.name}</p>
      <nav style={{ marginBottom: 12 }}>
        <Link to="/profile">Details</Link>
        <Link to="settings" style={{ marginLeft: 8 }}>
          Settings
        </Link>
      </nav>

      <div style={{ padding: 12 }}>
        <Routes>
          <Route index element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>

        {/* fallback outlet in case nested routes rendered elsewhere */}
        <Outlet />
      </div>
    </div>
  )
}
