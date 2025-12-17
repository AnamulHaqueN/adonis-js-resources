import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import Workspaces from "./Workspaces"

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="p-6">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
      <p className="mb-6">Your email: {user?.email}</p>
      <Workspaces />
    </div>
  )
}
