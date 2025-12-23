import { useEffect, useState } from 'react'
import {
  getWorkspaces,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from '../api/workspaces'
import { useAuth } from '../context/useAuth'


type Workspace = {
  id: number
  name: string
  companyId: number
  userId: number
  createdAt: string
  updatedAt: string
}

export default function Workspaces() {
  const { user } = useAuth()

  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // pagination
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit, setLimit] = useState(5)

  const loadWorkspaces = async (pageNumber = page) => {
    setLoading(true)
    try{
    const res = await getWorkspaces(pageNumber, limit)
    console.log(res)
    setWorkspaces(res.workspaces.data)
    setPage(res.workspaces.meta.currentPage)
    setLastPage(res.workspaces.meta.lastPage)
    setTotal(res.workspaces.meta.total)
    } catch{
      setError('Failed to load workspaces')
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWorkspaces(page)
  }, [page, limit])

  const canModify = (workspace: Workspace) => {
    if (!user) return false
    return user.role === 'owner' || user.id === workspace.userId
  }

  const handleCreate = async () => {
    if (!name.trim()) return
    setLoading(true)
    try{
      await createWorkspace({ name })
      setName('')
      await loadWorkspaces(1)
    } catch {
      setError('Failed to create workspace')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (workspace: Workspace) => {
    if (!canModify(workspace)) {
      setError("You're not allowed to update this workspace")
      return
    }
    
    if(!name.trim()) return
    if(loading) return
   
    setLoading(true)
    
    try{
      await updateWorkspace(workspace.id, { name })
      setName('')
      setEditingId(null)
      await loadWorkspaces(page)
    } catch {
      setError('Failed to update workspace')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (workspace: Workspace) => {
    if (!canModify(workspace)) {
      setError("You're not allowed to delete this workspace")
      return
    }

    if (!confirm('Are you sure?')) return
    await deleteWorkspace(workspace.id)
    setPage(1)
    loadWorkspaces(1)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Workspaces</h1>

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {/* Create / Update */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Workspace name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        {editingId ? (
          <button
            onClick={() => {
              const ws = workspaces.find((w) => w.id === editingId)
              if (ws) handleUpdate(ws)
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleCreate}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {workspaces.map((ws) => {
          const allowed = canModify(ws)

          return (
            <div
              key={ws.id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span className="font-medium">{ws.name}</span>

              <div className="flex gap-3 items-center">
                {!allowed && (
                  <span className="text-xs text-gray-500">
                    Not permitted
                  </span>
                )}

                <button
                  onClick={() => {
                    if (!allowed) {
                      setError("You're not allowed to update this workspace")
                      return
                    }
                    setEditingId(ws.id)
                    setName(ws.name)
                  }}
                  className={`${
                    allowed ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(ws)}
                  className={`${
                    allowed ? 'text-red-600' : 'text-gray-400'
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}

        {workspaces.length === 0 && (
          <p className="text-gray-500">No workspaces found</p>
        )}
      </div>
      
      {/* set pagination limit */}
      <div className="flex items-center gap-2 mb-4">
          <label className="text-sm text-gray-600">Items per page:</label>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value))
              setPage(1)
            }}
            className="border px-2 py-1 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

       {/* Pagination */}
      {lastPage > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {lastPage} · Total {total}
          </span>

          <button
            disabled={page === lastPage}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

    </div>
  )
}
