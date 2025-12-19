import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateNote from './pages/CreateNote'
import NoteDetails from './pages/NoteDetails'
import EditNote from './pages/EditNote'
import ProtectedRoute from './components/ProtectedRoute'

/**
 * Simple auth check component
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/notes" element={<Notes />} /> */}
        

        {/* Protected routes */}
         <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notes/create" element={<CreateNote />} />
          <Route path="/notes/:id" element={<NoteDetails />} />
          <Route path="/notes/edit/:id" element={<EditNote />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
