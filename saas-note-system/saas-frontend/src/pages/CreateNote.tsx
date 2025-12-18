import { useEffect, useState } from 'react'
import { createNote } from '../api/notes'
import { useNavigate } from 'react-router-dom'
import { getWorkspaces, type Workspace } from '../api/workspaces'

export default function CreateNote() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [noteType, setNoteType] = useState<'public' | 'private'>('private')
  const [workspaceId, setWorkspaceId] = useState<number>(0)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await createNote({
      title,
      content,
      noteType,
      workspaceId,
    })

    navigate('/notes')
  }
  
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await getWorkspaces()
        setWorkspaces(res.workspaces || [])
        if (res.workspaces?.length) setWorkspaceId(res.workspaces[0].id) // default to first
      } catch (err) {
        console.error("Failed to fetch workspaces", err)
      }
    }
    fetchWorkspaces()
  }, [])

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Note</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border w-full p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border w-full p-2 rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          className="border w-full p-2 rounded"
          value={noteType}
          onChange={(e) => setNoteType(e.target.value as any)}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        {/* Workspace dropdown */}
        <select
          className="border w-full p-2 rounded"
          value={workspaceId ?? ''}
          onChange={(e) => setWorkspaceId(Number(e.target.value))}
        >
          {workspaces.map((ws) => (
            <option key={ws.id} value={ws.id}>
              {ws.name}
            </option>
          ))}
        </select>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Create
        </button>
        <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate('/')}>Back</button>
      </form>
    </div>
  )
}
