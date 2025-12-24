import { useEffect, useState } from "react";
import { getNotes, deleteNote, type Note, type VoteStatus } from "../api/notes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { createVotes } from "../api/notesVote";

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth(); // logged-in user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);

  const loadNotes = async (pageNumber = page) => {
    const res = await getNotes(pageNumber, limit);
    // console.log(res.notes.data[0].downvotes);
    setLoading(true);
    try {
      setNotes(res.notes.data || []);
      setPage(res.notes.meta.currentPage);
      setLastPage(res.notes.meta.lastPage);
      setTotal(res.notes.meta.total);
    } catch {
      setError("Failed to load Notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNotes(page);
  }, [page, limit]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this note?")) return;
    await deleteNote(id);
    setPage(1);
    loadNotes(1);
  };

  const handleVote = async (
    votes: VoteStatus[],
    noteId: number,
    voteType: "up" | "down"
  ) => {
    if (loading) return;
    setLoading(true);
    if (votes[0].voterUserId === noteId && votes[0].vote === voteType) {
      setLoading(false);
      return;
    }
    try {
      const res = await createVotes(noteId, voteType);
      loadNotes(page);
      console.log(res);
    } finally {
      setLoading(false);
    }
  };

  //console.log("show notes info", notes[0]);
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notes</h1>
        <button
          onClick={() => navigate("/notes/create")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => {
          const canEditOrDelete =
            user && (user.id === note.userId || user.role === "owner");

          const canShow =
            user && (user.id === note.userId || note.noteType === "public");
          if (!canShow) return null;

          const canVote =
            note.noteType === "public" && user?.id !== note.userId;

          return (
            <div
              key={note.id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">
                  {note.id} - {note.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {note.noteType.toUpperCase()}
                </p>

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
                      onClick={() => handleVote(note.votes, note.id, "up")}
                      className="text-green-600"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleVote(note.votes, note.id, "down")}
                      className="text-red-600"
                    >
                      👎
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {notes.length === 0 && <p className="text-gray-500">No notes found</p>}
      </div>

      {/* set pagination limit */}
      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm text-gray-600">Items per page:</label>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      {/* Paggination */}
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
            Page {page} of {lastPage} . Total {total}
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
  );
}
