import { useEffect, useState } from "react";
import { getNoteById, updateNote } from "../api/notes";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteType, setNoteType] = useState<"public" | "private">("private");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getNoteById(Number(id)).then((note) => {
        setTitle(note.title);
        setContent(note.content);
        setNoteType(note.noteType);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (loading) return;

    setLoading(true);
    try {
      await updateNote(Number(id), { title, content, noteType });
      navigate("/notes");
    } catch (error) {
      setError("Failed to Edit note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border w-full p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border w-full p-2 rounded"
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

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
