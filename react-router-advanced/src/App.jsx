import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Layout from './components/Layout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'
import ProfileDetails from './components/ProfileDetails.jsx'
import ProfileSettings from './components/ProfileSettings.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PostsList from './components/PostsList.jsx'
import Post from './components/Post.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            <Route path="posts" element={<PostsList />} />
            <Route path="posts/:postId" element={<Post />} />

            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              <Route index element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>

            <Route path="*" element={<div style={{ padding: 20 }}>404 — Not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
