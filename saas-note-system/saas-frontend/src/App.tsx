import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState, type JSX } from 'react'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

/**
 * Simple auth check component
 */
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3333/me', {
      method: 'GET',
      credentials: 'include', // IMPORTANT (cookie-based auth)
    })
      .then((res) => {
        if (res.ok) setAuthenticated(true)
        else setAuthenticated(false)
      })
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-6">Loading...</div>

  return authenticated ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
