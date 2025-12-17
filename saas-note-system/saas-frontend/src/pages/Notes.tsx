import { useEffect, useState } from 'react'
import { getNotes, deleteNote, type Note } from '../api/notes'
import { useNavigate } from 'react-router-dom'

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const navigate = useNavigate()

  const loadNotes = async () => {
    const res = await getNotes()
    setNotes(res.notes || [])
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNotes()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this note?')) return
    await deleteNote(id)
    loadNotes()
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notes</h1>

        <button
          onClick={() => navigate('/notes/create')}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{note.title}</h2>
              <p className="text-sm text-gray-600">
                {note.noteType.toUpperCase()}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/notes/${note.id}`)}
                className="text-blue-600"
              >
                View
              </button>

              <button
                onClick={() => navigate(`/notes/edit/${note.id}`)}
                className="text-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {notes.length === 0 && (
          <p className="text-gray-500">No notes found</p>
        )}
      </div>
    </div>
  )
}
