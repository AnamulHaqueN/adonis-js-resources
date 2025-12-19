import { useEffect, useState } from 'react'
import { getNotes, deleteNote, type Note } from '../api/notes'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { voteNote } from '../services/NoteVoteService'

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const navigate = useNavigate()
  const { user } = useAuth() // logged-in user

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

  const handleVote = async (id: number, type: 'up' | 'down') => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    if (note.userVote === type) return;

    const updatedNote: Note = { ...note };

    // Remove previous vote if exists
    if (note.userVote === "up") updatedNote.upvotes -= 1;
    if (note.userVote === "down") updatedNote.downvotes -= 1;

    // Apply new vote
    if (type === "up") updatedNote.upvotes += 1;
    if (type === "down") updatedNote.downvotes += 1;

    updatedNote.userVote = type;

    // Optimistic UI update
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n.id === id ? updatedNote : n))
    );

    try {
      await voteNote(id, type);
    } catch (error: any) {
      alert(error.response?.data?.message || "Error voting note");
      // rollback
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === id ? note : n))
      );
    }
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
        {notes.map((note) => {
          const canEditOrDelete =
            user && (user.id === note.userId || user.role === 'owner')

          const canShow =
            user && (user.id === note.userId || note.noteType === 'public')
          if (!canShow) return null

          const canVote =
            note.noteType === 'public' && user?.id !== note.userId

          return (
            <div
              key={note.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{note.title}</h2>
                <p className="text-sm text-gray-600">{note.noteType.toUpperCase()}</p>

                {/* Vote counts */}
                <div className="text-sm text-gray-500 mt-1 flex gap-2">
                  👍 {note.upvotes || 0} | 👎 {note.downvotes || 0}
                </div>

              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => navigate(`/notes/${note.id}`)}
                  className="text-blue-600"
                >
                  View
                </button>

                {canEditOrDelete && (
                  <>
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
                  </>
                )}

                {canVote && (
                  <>
                    <button
                      onClick={() => handleVote(note.id, 'up')}
                      disabled={note.userVote === 'up'} // disable if already upvoted
                      className="text-green-600"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleVote(note.id, 'down')}
                      disabled={note.userVote === 'down'} // disable if already downvoted
                      className="text-red-600"
                    >
                      👎
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}

        {notes.length === 0 && (
          <p className="text-gray-500">No notes found</p>
        )}
      </div>
    </div>
  )
}
