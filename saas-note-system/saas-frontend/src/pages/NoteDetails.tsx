import { useEffect, useState } from 'react'
import { getNoteById, type Note } from '../api/notes'
import { useParams } from 'react-router-dom'

export default function NoteDetails() {
  const { id } = useParams()
  const [note, setNote] = useState<Note | null>(null)

  useEffect(() => {
    if (id) {
      getNoteById(Number(id)).then((res) => setNote(res.note))
    }
  }, [id])

  if (!note) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{note.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{note.noteType}</p>
      <p>{note.content}</p>
    </div>
  )
}
