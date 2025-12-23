import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteById } from "../api/notes";

type Note = {
  id: number;
  title: string;
  content: string;
  noteType: "public" | "private";
  workspace?: {
    id: number;
    name: string;
  };
  creator?: {
    id: number;
    name: string;
  };
};

export default function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getNoteById(Number(id))
      .then((res) => {
        setNote(res.note ?? res.data ?? res);
      })
      .catch(() => setNote(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!note) return <p className="p-6 text-red-500">Note not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{note.title}</h1>

      <div className="text-sm text-gray-600 mb-4 space-y-1">
        <p>
          <span className="font-medium">Type:</span> {note.noteType}
        </p>

        {note.workspace && (
          <p>
            <span className="font-medium">Workspace:</span>{" "}
            {note.workspace.name}
          </p>
        )}

        {note.creator && (
          <p>
            <span className="font-medium">Created by:</span> {note.creator.name}
          </p>
        )}
      </div>

      <p className="text-gray-800 leading-relaxed">{note.content}</p>
    </div>
  );
}
