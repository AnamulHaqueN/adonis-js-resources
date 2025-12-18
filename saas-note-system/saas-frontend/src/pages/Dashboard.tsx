import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import Workspaces from "./Workspaces"
import Notes from "./Notes"

type Section = "workspaces" | "notes"

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<Section>("workspaces")

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <div className="p-6">
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>

      <h1 className="text-2xl font-bold mb-1">Welcome To Company, {user?.companyName}</h1>
      <p className="mb-6 text-gray-600">{user?.name}</p>

      {/* Section buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveSection("workspaces")}
          className={`px-4 py-2 rounded ${
            activeSection === "workspaces"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Workspaces
        </button>

        <button
          onClick={() => setActiveSection("notes")}
          className={`px-4 py-2 rounded ${
            activeSection === "notes"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Notes
        </button>
      </div>

      {/* Conditional rendering */}
      {activeSection === "workspaces" && <Workspaces />}
      {activeSection === "notes" && <Notes />}
    </div>
  )
}